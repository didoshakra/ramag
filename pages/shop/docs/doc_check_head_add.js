//d_doc_check_head.js //Основа- Довідник/НеДовідник\getServerSideProps(context)/useSWR/agGrid\...Form
//Варіант з додавання/кор... з цієї проги

import useSWR from "swr" //https://www.setup.pp.ua/2020/06/useswr-react.html
import { useEffect, useContext, useMemo, useState, useCallback, useRef } from "react"
import { useRouter } from "next/router"
import { AgGridReact } from "ag-grid-react"
import Layout from "../../../components/Main/Layout"
import { dbHost } from "../../../config/dbHost"
import { ComponentContext } from "../../../context/ComponentContext"
//********************************************************** */
// import "ag-grid-enterprise" //Для EXELL/Дає помилку червоні зірочки, бо не ліцензований
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
// import "ag-grid-community/dist/styles/ag-theme-balham.css"
import IconAdd from "../../../components/ui/svg/table/IconAdd"
import IconPencil_c3 from "../../../components/ui/svg/table/IconPencil_c3"
import IconCancel from "../../../components/ui/svg/head/IconCancel"
import IconRefresh from "../../../components/ui/svg/table/IconRefresh"
import IconTrash from "../../../components/ui/svg/table/IconTrash_с2" //Корзина
import IconMoon_border from "../../../components/ui/svg/head/IconMoon_border"
import IconSun_border from "../../../components/ui/svg/head/IconSun_border"
import IconSelect from "../../../components/ui/svg/table/IconSelect" //вибрати
import IconTable_c2 from "../../../components/ui/svg/table/IconTable_c2"
import IconExport from "../../../components/ui/svg/table/IconExport"
import IconPrinter_c2 from "../../../components/ui/svg/head/IconPrinter_c2" //Принтер
import DocCheckHeadForm from "../../../components/Shop/Docs/DocCheckHeadForm"
import DocCheckProducts from "./doc_check_products"

function DocCheckHead({ data, isDovidnuk = false, setDovActive, setValue }) {
  const titleTable = "Товарні чеки" //заголовок
 const { state, dispatch } = useContext(ComponentContext)
 const { theme, themeTypeLight } = state
  const router = useRouter() //для переходу на сторінки
  const gridRef = useRef(0)
  const [gridApi, setGridApi] = useState(null)
  const [rowData, setRowData] = useState()
  const [autoPageSize, setAutoPageSize] = useState(false)
  const [countSelectedRows, setCountSelectedRows] = useState(0) //к-сть виділених рядків
  const [selectedRowState, setSelectedRowState] = useState({}) //виділені рядки(вміст)
  const [formActive, setFormActive] = useState(false) //Для відкриття/закриття форми
  const [formData, setFormData] = useState({}) //Початкове значення для форми
  const [isAdd, setIsAdd] = useState(false) //Щоб знати для чого заходилось у форму(добавл чи кориг)
  const [docContent, setDocContent] = useState("") //Для вибору форми вмісту документу

  //*** параметри і ф-ції AG_Grid **************************************** */
  const columnDefs = useMemo(() => [
    //   const [columnDefs, setColumnDefs] = useState([
    {
      minWidth: 30,
      maxWidth: 50,
      checkboxSelection: isDovidnuk ? false : true, //
      headerCheckboxSelection: isDovidnuk ? false : true, //Добавляє в шапку
      sortable: false,
      suppressMenu: true,
      filter: false,
      resizable: false,
      lockPosition: "left", //блокує стовпець з одного боку сітки "left"або "right",(перетякування інших не діє)
      suppressMovable: true, //Заборона перетягнути заголовок стовпця.
      suppressSizeToFit: true, // заборона на автоматичне змінення розміру стовбця(до розміру екрану)
    },
    { field: "id", headerName: "№чека" },
    { field: "total", headerName: "Сума(грн)", type: "numericColumn", minWidth: 120, flex: 2 },
    { field: "discount", headerName: "Знижка(грн)", type: "rightAligned", minWidth: 140, flex: 2 },

    { field: "datetime", headerName: "Час створення", minWidth: 180 }, //Прихований(hide) рядок
    // { field: "number", headerName: "№ чека" },
    { field: "departament_id", hide: true }, //Прихований(hide) рядок
    { field: "kasa", headerName: "Каса" },
    { field: "cashier_id", hide: true }, //Прихований(hide) рядок
    { field: "cashier", headerName: "Касир", minWidth: 200, flex: 3 }, //Прихований(hide) рядок
    { field: "client_id", hide: true },
    { field: "client", headerName: "Клієнт", minWidth: 200, flex: 3 },
  ])

  const defaultColDef = {
    flex: 1,
    width: 100,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
    // cellRenderer: RendNumer,//Колір для парних рядків
    suppressDragLeaveHidesColumns: false,
    suppressSizeToFit: true, //автоматичне змінення розміру стовбця(до розміру екрану)
  }

  // useEffect(() => {
  //   if (gridApi) {
  //     //Якщо включено sizeColumnsToFit, то не працює параметр flex:1/flex:2...
  //     gridApi.sizeColumnsToFit() //Розмір стовпців відповідно до встановленого розміру(width).Якщо width не встановлено то воно береться з defaultColDef
  //   }
  // }, [rowData])

  // загрузка даних в Agrid
  const onGridReady = (params) => {
    if (gridApi) {
      //Якщо включено sizeColumnsToFit, то не працює параметр flex:1/flex:2...
      gridApi.sizeColumnsToFit() //Розмір стовпців відповідно до встановленого розміру(width).Якщо width не встановлено то воно береться з defaultColDef
    }
    setGridApi(params.api)
    setRowData(data) //з сервера Pg
    // Тестові дані з зовнішного сервера
    // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setRowData(data)
    //   })
  }

  //https://stackoverflow.com/questions/44263350/count-number-of-selected-rows-in-ag-grid
  const onSelectionChanged = (params) => {
    setCountSelectedRows(params.api.getSelectedRows().length) //к-сть вибраних рядків
    setSelectedRowState(params.api.getSelectedRows()) //вибрані рядки(iнформація)
    // console.log("doc_check_head.js/SelectionChanged/К-сть вибраних рядків=", countSelectedRows)
    // console.log("doc_check_head.js/SelectedRowState=", selectedRowState)
  }
  //------------------------------------------------------------------------------------------------------------ */
  const refreshState = () => {
    // console.log("doc_check_head.js/refreshState")
    setRowData(data) //з сервера Pg
  }
  //*** відновити початковий стан стовбців //https://www.ag-grid.com/archive/27.2.0/react-data-grid/column-state/
  const resetState = useCallback(() => {
    gridRef.current.columnApi.resetColumnState()
    // console.log("column state reset")
  }, [])

  // зміна теми
  const changeTheme = () => {
    let newTheme = "light"
    if (themeTypeLight) {
      newTheme = "dark"
    }
    dispatch({ type: "THEME", payload: newTheme }) //Змінюємо state.theme
  }

  // Вибір(змінити) к-сті рядків на сторінці //***https://www.ag-grid.com/archive/26.0.0/react-data-grid/row-pagination/
  const onPageSizeChanged = useCallback(() => {
    setAutoPageSize(false)
    var value = document.getElementById("page-size").value
    if (value == "0") setAutoPageSize(true)
    gridRef.current.api.paginationSetPageSize(Number(value))
  }, [])

  // Вихід з форми
  const onCancel = () => {
    //якщо не довідник
    if (!isDovidnuk) router.push("/") //перехід на сторінку
    // if (!isDovidnuk) router.back() //повернутись
    else setDovActive("")
  }

  //============================================================================================ */
  //=== Add/Edit/Delete/Cancel ================================================================= */
  //--- Добавалення запису (кнопка) ----------------------------------------------*/
  const onAdd = () => {
    setIsAdd(true) //Для форми(добавлення чи коригування)
    setFormData(null) //Пусті дані в форму
    setFormActive(true) //Відкриваємо форму для занесення інфи
    // rowAdd(formData)// переніс в onCloseForm
  }
  //--- Добавалення(create) запису(запит)
  const rowAdd = async (formData) => {
    // console.log("doc_check_head.js/rowAdd/formData=", formData)
    // console.log("doc_check_head.js/rowAdd/JSON.stringify(formData)=", JSON.stringify(formData))
    const url = "/api/shop/docs/doc_check_head/insert" //працює
    const options = {
      method: "POST",
      body: JSON.stringify(formData), //Для запитів до серверів використовувати формат JSON
      headers: {
        "Content-Type": "application/json", //Вказує на тип контенту
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      // якщо HTTP-статус в диапазоне 200-299
      const resRow = await response.json() //повертає тіло відповіді json
      //   console.log("doc_check_head.js/rowAdd/try/esponse.ok/resRow=", resRow)
      alert(`Запис успішно добавленo ${resRow}`)
      return resRow
    } else {
      const err = await response.json() //повертає тіло відповіді json
      //   alert(`Запис не добавлено! ${err.message} / ${err.stack}`)
      console.log(`doc_check_head.js/rowAdd/try/else/\ Помилка при добавленні запису\ ${err.message} / ${err.stack} `)
    }
  }
  //--- Коригування записів(кнопка) ------------------------------------------------------- */
  const onEdit = () => {
    if (countSelectedRows > 0) {
      const selectRow = selectedRowState["0"] //Значення всіх полів 0-го виділеного рядка
      setIsAdd(false) //Для форми(добавлення чи коригування)
      setFormData(selectRow) //Дані з вибраного запису в форму
      setFormActive(true) //Відкриваємо форму для занесення інфи
      // rowEdit(formData)// переніс в onCloseForm, бо зразу спрацьовувало
      //   console.log("DocCheckHead/onEdit/selectRow  = ", selectRow)
      //****************************************** */
    } else {
      alert("Не вибрано ні одного запису для коригуввання")
    }
  }
  //--- Коригування запису(запит)
  const rowEdit = async (newRow) => {
    console.log("/agrid_users-pg/rowEdit//newRow= ", newRow)
    //Запит до сервера БД
    const url = "/api/shop/docs/doc_check_head/edit" //вибрати все-працює
    const options = {
      method: "PUT",
      body: JSON.stringify(newRow),
      // headers: {
      //   "Content-Type": "application/json", //Вказує на тип контенту
      // },
    }
    const response = await fetch(url, options)
    // alert("+++psql-...-fetch.js/PUT/response.status= " + response.status);
    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299
      const resEdit = await response.json() //повертає тіло відповіді json
      alert(`Змінено ${resEdit} записів`)
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Помилка зміни записів! ${err.message} / ${err.stack}`)
      // console.log(`+++psql-...-fetch.js/UPDATE/ ${err.message} / ${err.stack} `);
    }
  }
  //--- Вилучення записів(кнопка) -------------------------------------*/
  const onDelete = () => {
    if (countSelectedRows > 0) {
      const selRowsID = selectedRowState.map((item) => +item.id) // Створюємо(+) масив id-рядків для вилучення /
      //   console.log("DocCheckHead/onDelete/selRowsID  = ", selRowsID)
      rowsDelete(selRowsID)
    }
  }
  //--- Вилучення записів(запит)
  const rowsDelete = async (rows) => {
    // console.log("+++++f2-flex-table-psql.js/App/onDelete/rowDelete/rows=", rows);
    const url = "/api/shop/docs/doc_check_head/delete" //працює
    const options = {
      method: "DELETE",
      body: JSON.stringify(rows), //Для запитів до серверів використовувати формат JSON
      //headers: { //не треба header
    }
    const response = await fetch(url, options)
    if (response.ok) {
      // якщо HTTP-статус в диапазоне 200-299
      const resDelete = await response.json() //повертає тіло відповіді json
      alert(`Вилучено ${resDelete} записів`)
      // console.log(`psql-...-fetch.js/Вилучено ${resDelete} записів`);
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Помилка вилучення записів! ${err.message} / ${err.stack}`)
      // console.log(`+++psql-...-fetch.js/DELETE/ ${err.message} / ${err.stack} `);
    }
  }

  //------ Закриття форми вводу даних (UsersForm) ----------------/
  const onCloseForm = (formData) => {
    console.log("d_doc_check_head.js/onCloseForm/formData=", formData)
    setFormActive(false)
    //Якщо є дані з форми
    if (formData) {
      if (isAdd) rowAdd(formData)
      else rowEdit(formData) //Виклик ф-ції запису в БД
      // onGridReady()
      refreshState()
      // setRowData(data)
    }
  }

  //При двойному кліку по рядку вибрати(Pick) значення з довідника і передати в input форми
  const onDoubleClicke = () => {
    if (isDovidnuk) toDov()
    else toDocContent()
  }

  //Вибрати значення з довідника і передати в input форми
  const toDov = () => {
    // console.log("doc_check_head.js/toDov/SelectedRowState=", selectedRowState["0"])
    setDovActive("")
    setValue("DocCheckHeadId", selectedRowState["0"].id)
    setValue("DocCheckHead", selectedRowState["0"].name)
    // Router.back()//На попередню сторінку
  }
  //Перейти на форму вмісту документа
  const toDocContent = () => {
    setDocContent("DocCheckProducts")
    setFormData(selectedRowState["0"]) //Дані з вибраного запису в форму
  }

  //--- ExportExell */ Пацює привключеній опції "ag-grid-enterprise"
  const onExportExcel = useCallback(() => {
    alert("onExportExcel")
    gridRef.current.api.exportDataAsExcel()
  }, [])

  //******************************************************************* */
  //--- На друк
  const onPrint = () => {
    alert("onPrint")
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="agrid_head-title-mobi">
        <p></p>
        <p>{titleTable}</p>
        <p>
          <button className="agrid_head-nav-button" onClick={onCancel} title="Вийти">
            <IconCancel width="15" height="15" colorFill={theme.colors.tableIcon} />
          </button>
        </p>
      </div>
      <div className="agrid_head-container">
        <div className="agrid_head-container-left">
          {isDovidnuk ? (
            <>
              <button className="agrid_head-nav-button" onClick={toDov} title="Вибрати">
                <IconSelect width="15" height="15" colorFill={theme.colors.tableIcon} />
              </button>
            </>
          ) : (
            <>
              <button className="agrid_head-nav-button" onClick={changeTheme} title="Зміна теми">
                {themeTypeLight ? (
                  <IconMoon_border width="15" height="15" colorFill={theme.colors.tableIcon} />
                ) : (
                  <IconSun_border width="15" height="15" colorFill={theme.colors.tableIcon} />
                )}
              </button>
              <button
                className="agrid_head-nav-button"
                onClick={resetState}
                title="Відновлення початкового стану колонок"
              >
                <IconTable_c2
                  width="15"
                  height="15"
                  colorFill={theme.colors.tableIcon}
                  colorFill1={theme.colors.tableIcon1}
                />
                {/* Колонки */}
              </button>
              <button className="agrid_head-nav-button" onClick={refreshState} title="Обновити дані">
                <IconRefresh width="15" height="15" colorFill={theme.colors.tableIcon} />
              </button>
              {countSelectedRows === 0 ? (
                <button className="agrid_head-nav-button" onClick={onAdd} title="Добавити">
                  <IconAdd width="15" height="15" colorFill={theme.colors.tableIcon} />
                </button>
              ) : (
                ""
              )}
              {countSelectedRows === 1 ? (
                <button className="agrid_head-nav-button" onClick={onEdit} title="Редагувати">
                  <IconPencil_c3
                    width="15"
                    height="15"
                    colorFill={theme.colors.tableIcon}
                    colorFill1={theme.colors.tableIcon1}
                    colorFill2={theme.colors.tableIcon2}
                  />
                </button>
              ) : (
                ""
              )}
              {countSelectedRows > 0 ? (
                <button className="agrid_head-nav-button" onClick={onDelete} title="Видалити">
                  <IconTrash
                    width="15"
                    height="15"
                    colorFill={theme.colors.tableIcon}
                    colorFill1={theme.colors.tableIcon1}
                  />
                </button>
              ) : (
                ""
              )}
              <select
                className="agrid_head-nav-button"
                style={{ height: "25px" }}
                defaultValue={"10"}
                onChange={() => onPageSizeChanged()}
                id="page-size"
                title="Page Size"
              >
                <option value="10" disabled>
                  10
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
        {/* <div>Імпортовано: {insertRows.current} зап.</div> */}
        {/*  */}
        <div className="agrid_head-container-right">
          {isDovidnuk ? (
            ""
          ) : (
            <>
              <div style={{ display: "flex" }}>
                <button className="agrid_head-nav-button" onClick={onPrint} title="Друк на принтер">
                  <IconPrinter_c2
                    width="15"
                    height="15"
                    colorFill={theme.colors.tableIcon}
                    colorFill1={theme.colors.tableIcon1}
                  />
                </button>
                <button className="agrid_head-nav-button" onClick={onExportExcel} title="Експорт в Excel">
                  <IconExport
                    width="15"
                    height="15"
                    colorFill={theme.colors.tableIcon}
                  />
                </button>
              </div>
            </>
          )}
          <button className="agrid_head-nav-button" onClick={onCancel} title="Вийти">
            <IconCancel width="15" height="18" colorFill={theme.colors.tableIcon} />
          </button>
        </div>
      </div>
      <div
        style={{ height: "calc(100% - 37px)" }}
        className={themeTypeLight ? "ag-theme-alpine" : "ag-theme-alpine-dark"}
      >
        <AgGridReact
          ref={gridRef} // Без нього не працює gridRef.current.columnApi.
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef} //Параметри для всіх колонок
          onGridReady={onGridReady} //Загрузка даних
          sortable={true} //сортування для всіх колонок
          animateRows={true} //щоб рядки анімувалися під час сортування
          pagination={true} //сторінки
          paginationPageSize={10} //к-сть рядків в сторінці
          paginationAutoPageSize={autoPageSize} //к-сть рядків в сторінці-АВТОМАТИЧНО
          suppressDragLeaveHidesColumns //зупинить видалення стовпців із сітки, якщо їх перетягнути за межі сітки.
          rowSelection={isDovidnuk ? "single" : "multiple"} //дозволяє вибирати рядки клацанням миші
          // onRowSelected={onRowSelected} ////Для вибору даних використовую ф-цію selectedRowState
          onSelectionChanged={onSelectionChanged} //Вибір клацанням на рядок
          onRowDoubleClicked={onDoubleClicke} //Подвійниц клік на рядку
        ></AgGridReact>
      </div>
      {formActive && <DocCheckHeadForm onCloseForm={onCloseForm} formData={formData} />}
      {docContent == "DocCheckProducts" && (
        <DocCheckProducts
          setDocContent={setDocContent} //Активація lдокументу
          docHeadData={formData}
        />
      )}

      {/* <DocCheckProducts
        isDovidnuk={true}
        setDocContent={setDocContent} //Активація lдокументу
      /> */}
      {/* --- */}
      <style jsx>{`
        .agrid_head-container-left,
        .agrid_head-container {
          padding: 0.1vw;
          display: flex;
          justify-content: space-between; //   притискає до країв
          align-items: center;
          background-color: ${theme.colors.tableHeadBackground};
        }

        .agrid_head-container {
          border-ltft: 0.5px solid ${theme.colors.tableHeadBorder};
          border-top: 1px solid ${theme.colors.tableHeadBorder};
          border-right: 1px solid ${theme.colors.tableHeadBorder};
        }

        .agrid_head-container-right {
          display: none;
        }
        .agrid_head-title-mobi,
        .agrid_head-title {
          text-align: center; //Текст по центру Х
          vertical-align: middle;
          //   line-height: 40px; // Те саме, що й ваша висота div
          background-color: ${theme.colors.tableHeadBackground};
          color: ${theme.colors.tableHeadTitle};
          font-size: 18px;
          font-weight: bold;
        }
        .agrid_head-title-mobi {
          //   display: block;
          display: flex;
          justify-content: space-between; //по краях
        }
        .agrid_head-title {
          display: none;
        }
        .head-nav-button {
          display: flex;
          align-items: center;
          width: ${theme.size.formIconBorder};
          height: ${theme.size.formIconBorder};
          border-radius: ${theme.size.formIconBorder};
          border: 2px solid ${theme.colors.formButtonBorder};
          background-color: ${theme.colors.formBackground};
        }
        .head-nav-button:hover {
          cursor: pointer;
          background-color: ${theme.colors.formIconBackgroundHover};
        }

        @media (min-width: 960px) {
          .agrid_head-title-mobi {
            display: none;
          }
          .agrid_head-title {
            display: block;
          }
          .agrid_head-container-right {
            padding: 0.1vw;
            display: flex;
            justify-content: space-between; //   притискає до країв
            align-items: center;
            background-color: ${theme.colors.tableHeadBackground};
          }
        }
      `}</style>
    </div>
  )
}

//*************************************************************************************** */
//= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  //   export async function getStaticProps(context) {
  const response = await fetch(`${dbHost}/api/shop/docs/doc_check_head/select-all`)
  //onst response = await fetch("http://localhost:3000/api/shop/docs/doc_check_head/select-all")
  const data = await response.json()
  //   const data = null //
  //Якщо (!data)-видасть помилку 404
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { serverData: data }, // буде передано компоненту сторінки як атрибути
  }
}

const fetcher = (url) => fetch(url).then((r) => r.json()) // Для загрузка даних на фронтенді

export default function DDocCheckHead({
  serverData, //Вхідні дані з Сервера
  isDovidnuk = false, //Чи відкривати як довідник
  setDovActive, //Назва довідника
  setValue, //Для зміни Input в формі вводу даних
}) {
  // export default function DDocCheckHead({ serverData }) {
  //   console.log("Ddoc_check_head.js/")
  //= Загрузка даних на фронтенді useSWR ================================================================*/
  const { data, error } = useSWR("/api/shop/docs/doc_check_head/select-all", fetcher, { initialData: serverData })
  if (error) return <div>не вдалося завантажити</div>
  if (!data) return <p>Loading/Завантаження ...</p>
  //**============================================================================================= */

  const Dovidnuk = () => {
    return (
      <div style={{ position: "relative", width: "600px", height: "400px", maxWidth: "calc(100vw" }}>
        <DocCheckHead data={data} isDovidnuk={true} setDovActive={setDovActive} setValue={setValue} />
      </div>
    )
  }

  const NeDovidnuk = () => {
    return (
      <Layout>
        <div style={{ position: "relative", width: "calc(100vw)", height: "calc(100vh - 100px)" }}>
          <DocCheckHead data={data} />
        </div>
      </Layout>
    )
  }

  return <>{isDovidnuk ? <Dovidnuk /> : <NeDovidnuk />}</>
}
