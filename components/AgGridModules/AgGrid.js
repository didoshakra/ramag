//Grid.js //Основа- Довідник/НеДовідник
// import Brand from "../../../components/Shop//References/Brand"

//********************************************************** */
import { useContext, useState, useCallback, useRef } from "react"
import { AgGridReact } from "ag-grid-react"
// import "ag-grid-enterprise" //Для EXELL/Дає помилку червоні зірочки, бо не ліцензований
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
// import "ag-grid-community/dist/styles/ag-theme-balham.css" //Для EXELL
import IconAdd from "../ui/svg/table/IconAdd"
import IconPencil_c3 from "../ui/svg/table/IconPencil_c3"
import IconCancel from "../ui/svg/head/IconCancel"
import IconRefresh from "../ui/svg/table/IconRefresh"
import IconTrash from "../ui/svg/table/IconTrash_с2" //Корзина
import IconMoon_border from "../ui/svg/head/IconMoon_border"
import IconSun_border from "../ui/svg/head/IconSun_border"
import IconSelect from "../ui/svg/table/IconSelect" //вибрати
import IconTable_c2 from "../ui/svg/table/IconTable_c2"
import IconPrinter_c2 from "../ui/svg/head/IconPrinter_c2" //Принтер
import IconExport from "../ui/svg/table/IconExport"
import IconClientMale from "../ui/svg/table/IconClientMale"
import IconPaymentMethod from "../ui/svg/table/IconPaymentMethod"
import { ComponentContext } from "../../context/ComponentContext"
import CheckboxRenderer from "./CheckboxRenderer"

//******************************************************************************* */
export default function AgGrid({
  //AgGrid
  rowData,
  columnDefs,
  defaultColDef,
  setSelectedRowState, //Дані з вибраних рядків
  // Для шапки AgGrid
  titleTable,
  isDovidnuk = false, //Чи довідник (для інтерфейсу)
  onAdd,
  onEdit,
  onDelete,
  onCancel,
  onRefresh,
  onPrint,
  onImportExell,
  onExportExell,
  onChoose, // Вибрати(Choose) для форми, якщо довідник
  onClient, //Діалог вибору клієнта
  onPaymentDialog, //Діалог оплати
  //
  //
}) {
  //   console.log("Brand/setValue=", setValue)
  const { state, dispatch } = useContext(ComponentContext)
  const { theme, themeTypeLight } = state

  //== Налаштування прав
  const profile = 0 //Всі права
  const initProfil = () => {
    if (profile == 1) {
      onAdd = null //Заборона
      onEdit = null //Заборона
      onDelete = null //Заборона
      onImportExell = null //Заборона
      onExportExell = null //Заборона
      onPrint = null //Заборона
    }
  }
  initProfil()
  // ****

  const gridRef = useRef()
  //   const [gridApi, setGridApi] = useState(null)
  //   const [rowData, setRowData] = useState()
  const [autoPageSize, setAutoPageSize] = useState(false)
  const [countSelectedRows, setCountSelectedRows] = useState(0) //к-сть виділених рядків
  const [selectedRowGridID, setSelectedRowGridID] = useState(0) //GridId Виділеного рядка

  //= Загрузка даних в Agrid
  const onGridReady = (params) => {
    console.log("AgGrid.js/onGridReady/rowData=", rowData)
    // alert("onGridReady")
    // setRowData(data) //з сервера Pg
    document.querySelector("#filterTextBox")?.focus() //Передати фокус в швидкий фільтер
    gridRef.current.api.sizeColumnsToFit() //Розмір стовпців відповідно до встановленого розміру(width).Якщо width не встановлено то воно береться з defaultColDef
  }

  //== Запускається під час першого відтворення даних у сітці.//https://github.com/ag-grid/ag-grid/issues/2662
  const onFirstDataRendered = (params) => {
    // console.log("AgGrid.js/onFirstDataRendered/selectedRowGridID=", selectedRowGridID)
    console.log("AgGrid.js/onFirstDataRendered/selectedRowGridID=", selectedRowGridID)
    // alert("onFirstDataRendered")

    //**- Позиціонування на рядок */
    //- Переконатися, що рядок вже існує
    if (gridRef.current.api.getInfiniteRowCount() < selectedRowGridID) {
      gridRef.current.api.setInfiniteRowCount(selectedRowGridID, false) // якщо його (ще) не існує, попередньо завантажте дані за допомогою методу setInfiniteRowCount
    }
    //- Прокрутка до рядка
    // gridRef.current.api.ensureIndexVisible(selectedRowGridID) //прокручує сітку/рядок(RowID) середина вікна
    gridRef.current.api.ensureIndexVisible(selectedRowGridID, "top") //прокручує сітку/рядок(RowID) початок вікна
    // gridRef.current.api.getDisplayedRowAtIndex(selectedRowGridID).setSelected(true) //виділяє рядок
    //**------------------------------*/
  }

  //= Вибір рядка//https://stackoverflow.com/questions/44263350/count-number-of-selected-rows-in-ag-grid
  const onSelectionChanged = (params) => {
    // console.log("AgGrid.js/onSelectionChanged")
    // alert("onSelectionChanged")

    //-- Отримати дані з рядка */
    setCountSelectedRows(params.api.getSelectedRows().length) //к-сть вибраних рядків
    // setSelectedRowState(params.api.getSelectedRows()) //вибрані рядки(iнформація)
    setSelectedRowState(params.api.getSelectedRows()) //вибрані рядки(iнформація)
    // console.log("AgGrid.js/SelectionChanged/selectedRowGridID=", selectedRowGridID)

    //-- Отримати індекс рядка
    // const RowId = gridRef.current.api.getFirstDisplayedRow() //індекс першого відображеного рядка
    const RowId = params.api.getLastDisplayedRow() //індекс останнього відображеного рядка
    // // const RowId = params.api.getSelectedRows() //індекс вибраного рядка
    // console.log("AgGrid.js/onSelectionChanged/RowId(Last)=", RowId)
    // setSelectedRowGridID(RowId)
    // console.log("AgGrid.js/onSelectionChanged/RowId=",  RowId)
  }

  //= Відновити початковий стан стовбців //https://www.ag-grid.com/archive/27.2.0/react-data-grid/column-state/
  const resetState = useCallback(() => {
    gridRef.current.columnApi.resetColumnState()
    // console.log("column state reset")
  }, [])

  //= зміна теми
  const changeTheme = () => {
    let newTheme = "light"
    if (themeTypeLight) {
      newTheme = "dark"
    }
    dispatch({ type: "THEME", payload: newTheme }) //Змінюємо state.theme
  }

  //= Вибір(змінити) к-сті рядків на сторінці //***https://www.ag-grid.com/archive/26.0.0/react-data-grid/row-pagination/
  const onPageSizeChanged = useCallback(() => {
    setAutoPageSize(false)
    var value = document.getElementById("page-size").value
    if (value == "0") setAutoPageSize(true)
    gridRef.current.api.paginationSetPageSize(Number(value))
  }, [])

  //= Швидкий пошук
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(document.getElementById("filterTextBox").value)
  }, [])

  //------------------------------------------------------------------------------------------------------------ */
  //= ExportExell */
  const onExportExcel = useCallback(() => {
    alert("onExportExcel")
    gridRef.current.api.exportDataAsExcel()
  }, [])

  const onDoubleClicke = () => {
    onChoose()
  }

  //Для CheckboxRenderer
  const frameworkComponents = {
    checkboxRenderer: CheckboxRenderer,
  }

  //Переміщення по Enter //https://github.com/ag-grid/ag-grid/issues/6186
  const onCellFocused = (p) => {
    console.log("onCellFocused=", p)
    // const node = gridOptions.api.getDisplayedRowAtIndex(p.rowIndex)
    const node = gridRef.current.api.getDisplayedRowAtIndex(p.rowIndex)
    node.setSelected(true)
  }

  const onCellKeyPress = (p) => {
    console.log("onCellKeyPress=", p)
    if (p.event.key == "Enter") {
      console.log("Do action for ", p.node.data.athlete)
      onChoose()
    }
  }
  //******************************************************************* */
  const TableHead = () => {
    return (
      <>
        <div className="agrid_head-container">
          <div className="agrid_head-container-left">
            *
            {isDovidnuk ? (
              <>
                <button className="agrid_head-nav-button" onClick={onChoose} title="Вибрати">
                  <IconSelect
                    width={theme.size.tableIcon}
                    height={theme.size.tableIcon}
                    colorFill={theme.colors.tableIcon}
                  />
                </button>
              </>
            ) : (
              <>
                <button className="agrid_head-nav-button" onClick={changeTheme} title="Зміна теми">
                  {themeTypeLight ? (
                    <IconMoon_border
                      width={theme.size.tableIcon}
                      height={theme.size.tableIcon}
                      colorFill={theme.colors.tableIcon}
                    />
                  ) : (
                    <IconSun_border
                      width={theme.size.tableIcon}
                      height={theme.size.tableIcon}
                      colorFill={theme.colors.tableIcon}
                    />
                  )}
                </button>
                <button
                  className="agrid_head-nav-button"
                  onClick={resetState}
                  title="Відновлення початкового стану колонок"
                >
                  <IconTable_c2
                    width={theme.size.tableIcon}
                    height={theme.size.tableIcon}
                    colorFill={theme.colors.tableIcon}
                    colorFill1={theme.colors.tableIcon1}
                  />
                  {/* Колонки */}
                </button>

                {onRefresh && (
                  <button className="agrid_head-nav-button" onClick={onRefresh} title="Обновити дані">
                    <IconRefresh
                      width={theme.size.tableIcon}
                      height={theme.size.tableIcon}
                      colorFill={theme.colors.tableIcon}
                    />
                  </button>
                )}

                {countSelectedRows === 0 && onAdd && (
                  <button className="agrid_head-nav-button" onClick={onAdd} title="Добавити">
                    <IconAdd
                      width={theme.size.tableIcon}
                      height={theme.size.tableIcon}
                      colorFill={theme.colors.tableIcon}
                    />
                  </button>
                )}
                {countSelectedRows === 1 && onEdit && (
                  <button className="agrid_head-nav-button" onClick={onEdit} title="Редагувати">
                    <IconPencil_c3
                      width={theme.size.tableIcon}
                      height={theme.size.tableIcon}
                      colorFill={theme.colors.tableIcon}
                      colorFill1={theme.colors.tableIcon1}
                      colorFill2={theme.colors.tableIcon2}
                    />
                  </button>
                )}
                {countSelectedRows > 0 && onDelete && (
                  <button className="agrid_head-nav-button" onClick={onDelete} title="Видалити">
                    <IconTrash
                      width={theme.size.tableIcon}
                      height={theme.size.tableIcon}
                      colorFill={theme.colors.tableIcon}
                      colorFill1={theme.colors.tableIcon1}
                    />
                  </button>
                )}
                <select
                  className="agrid_head-nav-button"
                  style={{ width: "48px" }}
                  defaultValue={"20"}
                  onChange={() => onPageSizeChanged()}
                  id="page-size"
                  title="Розмір сторінки"
                >
                  <option value="0" disabled>
                    0
                  </option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">500</option>
                  <option value="0">auto</option>
                </select>
              </>
            )}
          </div>
          {/*  */}
          <div className="agrid_head-title">{titleTable}</div>
          {/* <div className={`agrid_head-title ${theme.colors.tableHeadTitle}`}>{titleTable}</div> */}
          {/*  */}
          <div className="agrid_head-container-right">
            {!isDovidnuk && (
              <div className="agrid_head-container-right-notMobi">
                {onImportExell && (
                  <input title="Імпорт з Exell" type="file" name="file" onChange={onImportExell} accept=".xlsx" />
                )}
                {onExportExell && (
                  <button className="agrid_head-nav-button" onClick={onExportExell} title="Експорт в Excel">
                    <IconExport
                      width={theme.size.tableIcon}
                      height={theme.size.tableIcon}
                      colorFill={theme.colors.tableIcon}
                      colorFill1={theme.colors.tableIcon1}
                    />
                  </button>
                )}
                {onPrint && (
                  <button className="agrid_head-nav-button" onClick={onPrint} title="Друк на принтер">
                    <IconPrinter_c2
                      width={theme.size.tableIcon}
                      height={theme.size.tableIcon}
                      colorFill={theme.colors.tableIcon}
                      colorFill1={theme.colors.tableIcon1}
                    />
                  </button>
                )}
              </div>
            )}
            {onPaymentDialog && (
              <button className="agrid_head-nav-button" onClick={onPaymentDialog} title="Оплата">
                <IconPaymentMethod
                  width={theme.size.tableIcon}
                  height={theme.size.tableIcon}
                  colorFill={theme.colors.tableIcon}
                />
              </button>
            )}
            {onClient && (
              <button className="agrid_head-nav-button" onClick={onClient} title="Клієнт">
                <IconClientMale
                  width={theme.size.tableIcon}
                  height={theme.size.tableIcon}
                  colorFill={theme.colors.tableIcon}
                />
              </button>
            )}

            <button className="agrid_head-nav-button" onClick={onCancel} title="Вийти">
              <IconCancel width={theme.size.tableIcon} height="18" colorFill={theme.colors.tableIcon} />
            </button>

            {/*  */}
          </div>
          <div className="agrid_head-title-mobi">
            <p>{titleTable}</p>
          </div>
          {/*  */}
        </div>
        <div className="quick-filter">
          Швидкий пошук:{" "}
          <input type="text" id="filterTextBox" placeholder="Filter..." onInput={onFilterTextBoxChanged} />
        </div>
        {/*  */}
        <style jsx>{`
          .agrid_head-container-right,
          .agrid_head-container-left,
          .agrid_head-container {
            padding: 0.1vw;
            display: flex;
            align-items: center;
            background-color: ${theme.colors.tableHeadBackground};
          }
          .agrid_head-container {
            justify-content: space-between; //   притискає до країв
            border-ltft: 0.5px solid ${theme.colors.tableHeadBorder};
            border-top: 1px solid ${theme.colors.tableHeadBorder};
            border-right: 1px solid ${theme.colors.tableHeadBorder};
          }
          .agrid_head-container-right {
            justify-content: space-end; //   притискає до країв
          }
          .agrid_head-container-right-notMobi {
            display: none;
          }
          .agrid_head-title-mobi,
          .agrid_head-title {
            text-align: center; //Текст по центру Х
            vertical-align: middle;
            background-color: ${theme.colors.tableHeadBackground};
            color: ${theme.colors.tableHeadTitle};
            font-size: 18px;
            font-weight: bold;
          }
          .agrid_head-title-mobi {
            display: flex;
            justify-content: center; //по краях
          }
          .agrid_head-title {
            display: none;
          }
          .agrid_head-nav-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: ${theme.size.tableIconBorder};
            height: ${theme.size.tableIconBorder};
            border-radius: ${theme.size.tableIconBorder};
            color: ${theme.colors.tableIcon};
            border: 2px solid ${theme.colors.tableIconBorder};
            background-color: ${theme.colors.tableHeadBackground};
          }
          .agrid_head-nav-button:hover {
            cursor: pointer;
            background-color: ${theme.colors.tableIconBackgroundHover};
          }
          .quick-filter {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-size: 12px;
            font-weight: bold;
            //   margin-left: 5px;
            background-color: ${theme.colors.tableHeadBackground};
          }

          @media (min-width: 480px) {
            .agrid_head-title-mobi {
              display: none;
            }
            .agrid_head-title {
              display: block;
            }
            .agrid_head-container-right-notMobi {
              padding: 0.1vw;
              display: flex;
              align-items: center;
              padding: 0.1vw;
              display: flex;
              justify-content: space-end; //   притискає до країв
              // background-color: ${theme.colors.tableHeadBackground};
            }
          }
        `}</style>
      </>
    )
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Шапка таблиці */}
      <TableHead />
      {/* Тіло таблиці */}
      <div
        style={{ height: "calc(100% - 37px)" }}
        className={themeTypeLight ? "ag-theme-alpine" : "ag-theme-alpine-dark"}
      >
        <AgGridReact
          ref={gridRef} // Без нього не працює gridRef.current.columnApi.
            rowData={rowData}
        //   rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef} //Параметри для всіх колонок
          onGridReady={onGridReady} //Загрузка даних
          sortable={true} //сортування для всіх колонок
          animateRows={true} //щоб рядки анімувалися під час сортування
          pagination={isDovidnuk ? false : true} //сторінки
          paginationPageSize={10} //к-сть рядків в сторінці
          paginationAutoPageSize={autoPageSize} //к-сть рядків в сторінці-АВТОМАТИЧНО
          suppressDragLeaveHidesColumns //зупинить видалення стовпців із сітки, якщо їх перетягнути за межі сітки.
          rowSelection={isDovidnuk ? "single" : "multiple"} //дозволяє вибирати рядки клацанням миші
          //   onRowSelected={onRowSelected} //Для вибору даних використовую ф-цію selectedRowState
          onSelectionChanged={onSelectionChanged} //Вибір клацанням на рядок
          //rr   onFirstDataRendered={onFirstDataRendered} //Запускається під час першого відтворення даних у сітці.
          onRowDoubleClicked={onDoubleClicke} //Подвійниц клік на рядку
          cacheQuickFilter={true} //Швидкий пошук
          frameworkComponents={frameworkComponents} //Для checkBox
          // suppressCellFocus={true}//Блокує навігацію клавішами
          // onCellClicked={onCellClicked} //
          // onRowEditingStarted={onRowEditingStarted}
          // onRowEditingStopped={onRowEditingStopped}
          // onCellEditingStarted={onCellEditingStarted}
          // onCellEditingSt/opped={onCellEditingStopped}
          // RowClicked={onRowClicked}
          // alwaysShowHorizontalScroll={true}//Полоса прокрутки завжди
          // alwaysShowVerticalScroll={true}//Полоса прокрутки завжди
          //rr   onCellFocused={onCellFocused}
          //rr onCellKeyPress={onCellKeyPress}
        ></AgGridReact>
      </div>
    </div>
  )
}
