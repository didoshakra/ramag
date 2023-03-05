//d_d_brand.js //Основа- Довідник/НеДовідник\getServerSideProps(context)/useSWR/agGrid\...Form
//- обновлення SWR-(mutate)

import useSWR from "swr" //https://www.setup.pp.ua/2020/06/useswr-react.html
import Layout from "../../../components/Main/Layout"
// import Brand from "../../../components/Shop//References/Brand"
import { dbHost } from "../../../config/dbHost"
import { pool } from "../../../config/dbShop"
//********************************************************** */
import { useEffect, useContext, useMemo, useState, useCallback, useRef } from "react"
import { useRouter } from "next/router"
import { AgGridReact } from "ag-grid-react"
// import "ag-grid-enterprise" //Для EXELL/Дає помилку червоні зірочки, бо не ліцензований
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
// import "ag-grid-community/dist/styles/ag-theme-balham.css" //Для EXELL
import IconAdd from "../../../components/ui/svg/table/IconAdd"
import IconPencil_c3 from "../../../components/ui/svg/table/IconPencil_c3"
import IconCancel from "../../../components/ui/svg/head/IconCancel"
import IconRefresh from "../../../components/ui/svg/table/IconRefresh"
import IconTrash from "../../../components/ui/svg/table/IconTrash_с2" //Корзина
import IconMoon_border from "../../../components/ui/svg/head/IconMoon_border"
import IconSun_border from "../../../components/ui/svg/head/IconSun_border"
import IconSelect from "../../../components/ui/svg/table/IconSelect" //вибрати
import IconTable_c2 from "../../../components/ui/svg/table/IconTable_c2"
import IconPrinter_c2 from "../../../components/ui/svg/head/IconPrinter_c2" //Принтер
import IconExport from "../../../components/ui/svg/table/IconExport"
import BrandForm from "../../../components/Shop/References/BrandForm"
import { ComponentContext } from "../../../context/ComponentContext"

//******************************************************************************* */
const urlAPI = "/api/shop/docs/doc_check_head/" // Для useSWR/getServerSideProp i...
const fetcher = (url) => fetch(url).then((r) => r.json()) // Для загрузка даних на фронтенді

export default function Brand({
  serverData, //Вхідні дані з Сервера
  isDovidnuk = false, //Чи відкривати як довідник
  setDovActive, //Назва довідника
  setValue, //Для зміни Input в формі вводу даних
}) {
  //   //= Загрузка даних на фронтенді useSWR == {refreshInterval: 0, //milliseconds}=========*/
  //   const { data, mutate, error } = useSWR("/api/shop/references/d_brand/select-all", fetcher)
  //   if (error) return <div>не вдалося завантажити</div>
  //   if (!data) return <p>Loading/Завантаження ...</p>
  //   //**================================================================================== */

  const Dovidnuk = () => {
    return (
      <div style={{ position: "relative", width: "600px", height: "400px", maxWidth: "calc(100vw - 20px)" }}>
        <GBrand serverData={serverData} isDovidnuk={true} setDovActive={setDovActive} setValue={setValue} />
      </div>
    )
  }

  const NeDovidnuk = () => {
    return (
      <Layout>
        <div style={{ position: "relative", width: "calc(100vw)", height: "calc(100vh - 150px)" }}>
          <GBrand serverData={serverData} />
        </div>
      </Layout>
    )
  }

  return <>{isDovidnuk ? <Dovidnuk /> : <NeDovidnuk />}</>
}

// //= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  //   const response = await fetch(`${dbHost}/api/shop/references/d_brand/select-all`)
  //   const data = await response.json()
  //**************************** */
  let data = {}
  const res = await pool.connect((err, client, done) => {
    const sql = "select * from d_brand ORDER BY id DESC"
    if (err) throw err //видає опис помилки підключення
    data = client.query(sql, (err, result) => {
      //   console.log("Category.js/getServerSideProps/result.rows=", result.rows)
      done() // call `done()` to release the client back to the pool
      if (err) {
        console.log("error running query", err)
      } else {
        return result.rows
        // resp.status(200).json(result.rows)
      }
    })
  })
  //**************************** */
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { serverData: data }, // буде передано компоненту сторінки як атрибути
  }
}

//*************************************************************************************** */
function GBrand({ serverData, isDovidnuk = false, setDovActive, setValue }) {
  const titleTable = "Бренди товарів" //заголовок
  //   console.log("Brand/setValue=", setValue)
  const { state, dispatch } = useContext(ComponentContext)
  const { theme, themeTypeLight } = state
  const router = useRouter() //для переходу на сторінки
  const gridRef = useRef()
  const [gridApi, setGridApi] = useState(null)
  const [rowData, setRowData] = useState()
  const [autoPageSize, setAutoPageSize] = useState(false)
  const [countSelectedRows, setCountSelectedRows] = useState(0) //к-сть виділених рядків
  const [selectedRowState, setSelectedRowState] = useState({}) //к-сть виділених рядків
  const [formActive, setFormActive] = useState(false) //Для відкриття/закриття форми
  //   const [formData, setFormData] = useState({}) //Початкове значення для форми
  const [toFormData, setToFormData] = useState({}) //Початкове значення для форми
  const [isAdd, setIsAdd] = useState(false) //Щоб знати для чого заходилось у форму(добавл чи кориг)
  const [selectedRowGridID, setSelectedRowGridID] = useState(0) //GridId Виділеного рядка

  //*** параметри і ф-ції AG_Grid **************************************** */
  const columnDefs = useMemo(
    () => [
      //   const [columnDefs, setColumnDefs] = useState([
      {
        //   headerName: "#",
        //   field: "id",
        minWidth: 30,
        maxWidth: 100,
        hide: isDovidnuk ? true : false, //Не прв doc_check_products- товари в чеках:казувати стовбець
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
      { field: "name", headerName: "Бренд / марка товару", minWidth: 200, flex: 2 },
      { field: "id", headerName: "id/Код" },
    ],
    [isDovidnuk]
  )

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
    setGridApi(params.api)
    setRowData(data) //з сервера Pg
    console.log("d_brand.js/onGridReady")
    document.querySelector("#filterTextBox")?.focus() //Передати фокус в швидкий фільтер

    // setRowData(dataMake) //Тестові дані з dataMake
    // Тестові дані з зовнішного сервера
    // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setRowData(data)
    //   })
  }

  //== Запускається під час першого відтворення даних у сітці.//https://github.com/ag-grid/ag-grid/issues/2662
  const onFirstDataRendered = (params) => {
    // console.log("d_brand.js/onFirstDataRendered/selectedRowGridID=", selectedRowGridID)
    // alert("onFirstDataRendered")
    //-- Позиціонування на рядок
    // gridRef.current.api.ensureIndexVisible(selectedRowGridID, "top") //прокручує сітку/рядок(RowID) початок вікна
    // gridRef.current.api.getDisplayedRowAtIndex(selectedRowGridID).setSelected(true)
  }

  //= Вибір рядка//https://stackoverflow.com/questions/44263350/count-number-of-selected-rows-in-ag-grid
  const onSelectionChanged = (params) => {
    // console.log("d_brand.js/onSelectionChanged")
    // alert("onSelectionChanged")

    //-- Отримати дані з рядка */
    setCountSelectedRows(params.api.getSelectedRows().length) //к-сть вибраних рядків
    setSelectedRowState(params.api.getSelectedRows()) //вибрані рядки(iнформація)
    // console.log("d_brand.js/SelectionChanged/selectedRowGridID=", selectedRowGridID)

    //-- Отримати індекс рядка
    // const RowId = gridRef.current.api.getFirstDisplayedRow() //індекс першого відображеного рядка
    const RowId = params.api.getLastDisplayedRow() //індекс останнього відображеного рядка
    // const RowId = params.api.getSelectedRows() //індекс вибраного рядка
    console.log("AgGrid.js/onSelectionChanged/RowId(Last)=", RowId)
    setSelectedRowGridID(RowId)
    // console.log("d_brand.js/onSelectionChanged/RowId=",  RowId)
  }

  //------------------------------------------------------------------------------------------------------------ */
  //= Оновити дані
  const onRefresh = () => {
    // console.log("d_brand.js/onRefresh")
    alert("onRefresh")
    mutate("/api/shop/references/d_brand/select-all", true) //Обновлення даних SWR
    // mutate() //Обновлення даних SWR
    // setRowData(data) //з сервера Pg
    // gridRef.current.api.ensureIndexVisible(16, "top") //прокручує сітку/рядок(RowID) всередину початок вікна
    // gridRef.current.api.ensureIndexVisible(agGridId, "top") //прокручує сітку/рядок(RowID) початок вікна
    // gridRef.current.api.ensureIndexVisible(selectedRowGridID, "top") //прокручує сітку/рядок(RowID) всередину видимого вікна
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

  //Переміщення по стрілках //https://github.com/ag-grid/ag-grid/issues/6186
  const onCellFocused = (p) => {
    console.log("onCellFocused=", p)
    // const node = gridOptions.api.getDisplayedRowAtIndex(p.rowIndex)
    const node = gridRef.current.api.getDisplayedRowAtIndex(p.rowIndex)
    node.setSelected(true)
  }

  //= Натиск на клавішу(Enter)
  const onCellKeyPress = (p) => {
    console.log("onCellKeyPress=", p)
    if (p.event.key == "Enter") {
      console.log("Do action for ", p.node.data.athlete)
      onChoose()
    }
  }

  //** */
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
    setToFormData(null) //Пусті дані в форму
    setFormActive(true) //Відкриваємо форму для занесення інфи
    // rowAdd(formData)// переніс в onCloseForm
  }

  //--- Добавалення(create) запису(запит)
  const rowAdd = async (formData) => {
    // console.log("d_brand.js/rowAdd/JSON.stringify(formData)=", JSON.stringify(formData))
    const url = "/api/shop/references/d_brand/insert" //працює
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
      const aler = await alert(`Запис успішно добавленo`)
      //   const data = await mutate("/api/shop/references/d_brand/select-all", true) //Обновлення даних
      const data = await mutate() //Обновлення даних
      //   setRowData(data)
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Запис не добавлено! ${err.message} / ${err.stack}`)
      //   console.log(`d_brand.js/rowAdd/try/else/ ${err.message} / ${err.stack} `)
    }
  }

  //--- Коригування записів(кнопка) ------------------------------------------------------- */
  const onEdit = () => {
    if (countSelectedRows > 0) {
      const selectRow = selectedRowState["0"] //Значення всіх полів 0-го виділеного рядка
      setIsAdd(false) //Для форми(добавлення чи коригування)
      setToFormData(selectRow) //Дані з вибраного запису в форму
      setFormActive(true) //Відкриваємо форму для занесення інфи
      // rowEdit(formData)// переніс в onCloseForm, бо зразу спрацьовувало
      //   console.log("Brand/onEdit/selectRow  = ", selectRow)
      //****************************************** */
    } else {
      alert("Не вибрано ні одного запису для коригуввання")
    }
  }
  //--- Коригування запису(запит)
  const rowEdit = async (newRow) => {
    // const agGridId = gridRef.current.api.getFirstDisplayedRow() // індекс першого відображеного рядка
    // console.log("/Gd_brand.js/rowEdit/getFirstDisplayedRow= ", agGridId)
    // gridRef.current.api.ensureIndexVisible(agGridId) //прокручує сітку, поки наданий індекс рядка не опиниться всередині видимого вікна перегляд
    // console.log("/agrid_users-pg/rowEdit//newRow= ", newRow)
    //Запит до сервера БД
    const url = "/api/shop/references/d_brand/edit" //вибрати все-працює
    const options = {
      method: "PUT",
      body: JSON.stringify(newRow),
      // headers: {
      //   "Content-Type": "application/json", //Вказує на тип контенту
      // },
    }

    // Запит
    const response = await fetch(url, options)
    // alert("+++psql-...-fetch.js/PUT/response.status= " + response.status);

    //Відповідь
    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299

      const awRes = await response.json() //повертає тіло відповіді json
      const awRefr = await onRefresh() //Обновлення даних
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Помилка зміни записів! ${err.message} / ${err.stack}`)
      // console.log(`+++psql-...-fetch.js/UPDATE/ ${err.message} / ${err.stack} `);
    }
  }

  //--- Вилучення записів(кнопка) -------------------------------------------------------*/
  const onDelete = () => {
    if (countSelectedRows > 0) {
      const selRowsID = selectedRowState.map((item) => +item.id) // Створюємо(+) масив id-рядків для вилучення /
      //   console.log("Brand/onDelete/selRowsID  = ", selRowsID)
      rowsDelete(selRowsID)
    }
  }
  //--- Вилучення записів(запит)
  const rowsDelete = async (rows) => {
    // console.log("+++++f2-flex-table-psql.js/App/onDelete/rowDelete/rows=", rows);
    const url = "/api/shop/references/d_brand/delete" //працює
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
  //--------------------------------------------------------------------------------------------------------- */

  //Закриття форми вводу даних (UsersForm)
  const onCloseForm = (formData) => {
    setFormActive(false)
    //Якщо є дані з форми
    if (formData) {
      if (isAdd) rowAdd(formData)
      else rowEdit(formData) //Виклик ф-ції запису в БД
      // onGridReady()
      //   onRefresh()
      // setRowData(data)
    }
  }
  //------------------------------------------------------------------------------------------------------------ */
  function onImportExcel() {
    alert("onImportExcel")
  }
  //--- ExportExell */
  const onExportExcel = useCallback(() => {
    alert("onExportExcel")
    gridRef.current.api.exportDataAsExcel()
  }, [])

  const onDoubleClicke = () => {
    if (isDovidnuk) onChoose()
  }

  //Вибрати(Pick) значення з довідника і передати в input форми
  const onChoose = () => {
    // console.log("d_brand.js/onChoose/SelectedRowState=", selectedRowState["0"])
       if (isDovidnuk) setDovActive("")
    setValue("brand_id", selectedRowState["0"].id)
    setValue("brand", selectedRowState["0"].name)
    // Router.back()//На попередню сторінку
  }

  const onCellClicked = () => {
    alert("onCellClicked")
  }
  const onRowEditingStarted = useCallback((event) => {
    console.log("never called - not doing row editing")
  }, [])

  const onRowEditingStopped = useCallback((event) => {
    console.log("never called - not doing row editing")
  }, [])

  const onCellEditingStarted = useCallback((event) => {
    console.log("cellEditingStarted")
  }, [])

  const onCellEditingStopped = useCallback((event) => {
    console.log("cellEditingStopped")
  }, [])

  //******************************************************************* */
  //--- На друк
  const onPrint = () => {
    alert("onPrint")
  }

  //Швидкий пошук
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(document.getElementById("filterTextBox").value)
    //
  }, [])

  //= Загрузка даних на фронтенді useSWR == {refreshInterval: 0, //milliseconds}=========*/
  const { data, mutate, error } = useSWR("/api/shop/references/d_brand/select-all", fetcher)
  if (error) return <div>не вдалося завантажити</div>
  if (!data) return <p>Loading/Завантаження ...</p>
  //**================================================================================== */

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="agrid_head-container">
        <div className="agrid_head-container-left">
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
              <button className="agrid_head-nav-button" onClick={onRefresh} title="Обновити дані">
                <IconRefresh
                  width={theme.size.tableIcon}
                  height={theme.size.tableIcon}
                  colorFill={theme.colors.tableIcon}
                />
              </button>
              {countSelectedRows === 0 ? (
                <button className="agrid_head-nav-button" onClick={onAdd} title="Добавити">
                  <IconAdd
                    width={theme.size.tableIcon}
                    height={theme.size.tableIcon}
                    colorFill={theme.colors.tableIcon}
                  />
                </button>
              ) : (
                ""
              )}
              {countSelectedRows === 1 ? (
                <button className="agrid_head-nav-button" onClick={onEdit} title="Редагувати">
                  <IconPencil_c3
                    width={theme.size.tableIcon}
                    height={theme.size.tableIcon}
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
                    width={theme.size.tableIcon}
                    height={theme.size.tableIcon}
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
                title="Розмір сторінки"
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
        {/*  */}
        <div className="agrid_head-container-right">
          {isDovidnuk ? (
            ""
          ) : (
            <>
              <div style={{ display: "flex" }}>
                <button className="agrid_head-nav-button" onClick={onPrint} title="Друк на принтер">
                  <IconPrinter_c2
                    width={theme.size.tableIcon}
                    height={theme.size.tableIcon}
                    colorFill={theme.colors.tableIcon}
                    colorFill1={theme.colors.tableIcon1}
                  />
                </button>
                <button className="agrid_head-nav-button" onClick={onExportExcel} title="Експорт в Excel">
                  <IconExport
                    width={theme.size.tableIcon}
                    height={theme.size.tableIcon}
                    colorFill={theme.colors.tableIcon}
                  />
                </button>
              </div>
            </>
          )}
          <button className="agrid_head-nav-button" onClick={onCancel} title="Вийти">
            <IconCancel width={theme.size.tableIcon} height="18" colorFill={theme.colors.tableIcon} />
          </button>
          {/*  */}
        </div>
      </div>
      <div className="agrid_head-title-mobi">
        <p>{titleTable}</p>
      </div>
      {/* PrintQuickFilterTexts */}
      <div className="quick-filter">
        Швидкий пошук: <input type="text" id="filterTextBox" placeholder="Filter..." onInput={onFilterTextBoxChanged} />
        {/* <button style={{ marginLeft: "20px" }} onClick={onPrintQuickFilterTexts}>
          Print Quick Filter Cache Texts
        </button> */}
      </div>
      {/*  */}
      <div
        style={{ height: "calc(100% - 37px)" }}
        className={themeTypeLight ? "ag-theme-alpine" : "ag-theme-alpine-dark"}
      >
        <AgGridReact
          ref={gridRef} // Без нього не працює gridRef.current.columnApi.
          //   rowData={rowData}
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef} //Параметри для всіх колонок
          onGridReady={onGridReady} //Загрузка даних
          sortable={true} //сортування для всіх колонок
          animateRows={true} //щоб рядки анімувалися під час сортування
          pagination={true} //сторінки
          //   paginationPageSize={500} //к-сть рядків в сторінці
          paginationAutoPageSize={autoPageSize} //к-сть рядків в сторінці-АВТОМАТИЧНО
          suppressDragLeaveHidesColumns //зупинить видалення стовпців із сітки, якщо їх перетягнути за межі сітки.
          rowSelection={isDovidnuk ? "single" : "multiple"} //дозволяє вибирати рядки клацанням миші
          // rowSelection="single" //// Для переміщення по стрілках
          // onRowSelected={onRowSelected} //Для вибору даних використовую ф-цію selectedRowState
          onSelectionChanged={onSelectionChanged} //Вибір клацанням на рядок
          onFirstDataRendered={onFirstDataRendered} //Запускається під час першого відтворення даних у сітці.
          onRowDoubleClicked={onDoubleClicke} //Подвійниц клік на рядку
          cacheQuickFilter={true} //Швидкий пошук
          onCellFocused={onCellFocused} // Для переміщення по стрілках
          onCellKeyPress={onCellKeyPress} //Натиск на клавішу(Enter)
          //   frameworkComponents={frameworkComponents} //Для checkBox
          //   suppressCellFocus={true}//Блокує навігацію клавішами
          //   onCellClicked={onCellClicked} //
          //   onRowEditingStarted={onRowEditingStarted}
          //   onRowEditingStopped={onRowEditingStopped}
          //   onCellEditingStarted={onCellEditingStarted}
          //   onCellEditingSt/opped={onCellEditingStopped}
          //   RowClicked={onRowClicked}
          //   alwaysShowHorizontalScroll={true}//Полоса прокрутки завжди
          //   alwaysShowVerticalScroll={true}//Полоса прокрутки завжди
        ></AgGridReact>
      </div>
      {formActive && <BrandForm onCloseForm={onCloseForm} toFormData={toFormData} />}
      {/* --- */}
      <style jsx>{`
        // .agrid_head-container-right-notMobi,
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
        // .agrid_head-container-right-notMobi {
        //   display: none;
        // }
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
          //   .agrid_head-container-right-notMobi {
          //     padding: 0.1vw;
          //     display: flex;
          //     justify-content: space-end; //   притискає до країв
          //     // align-items: center;
          //     // background-color: ${theme.colors.tableHeadBackground};
          //   }
        }
      `}</style>
    </div>
  )
}
