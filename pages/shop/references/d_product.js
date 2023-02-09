//d_product.js //Основа- Довідник/НеДовідник\getServerSideProps(context)/useSWR/agGrid\...Form
//??? Все ОК, крім асинхронного виводу добавлення записів в PostgreSQL

import Layout from "../../../components/Main/Layout"
import { dbHost } from "../../../config/dbHost"
import useSWR from "swr" //https://www.setup.pp.ua/2020/06/useswr-react.html
import * as XLSX from "xlsx"
import { useContext, useMemo, useState, useCallback, useRef } from "react"
import { useRouter } from "next/router"
import { AgGridReact } from "ag-grid-react"
// import ProgressBar from "../../../components/Main/ProgresBar"
import ProductInsertPasgreSQL from "../../../components/Shop/References/ProductInsertPasgreSQL"
import { ComponentContext } from "../../../context/ComponentContext"
//********************************************************** */
// import "ag-grid-enterprise" //Для EXELL/Дає помилку червоні зірочки, бо не ліцензований
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
// import "ag-grid-community/dist/styles/ag-theme-balham.css"
import CheckboxRenderer from "../../../components/Shop/AgGridModules/CheckboxRenderer"
//
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
import ProductForm from "../../../components/Shop/References/ProductForm"

//--- DProduct --------------------------------------------------------------
const urlAPI = "/api/shop/references/d_product/" // Для useSWR/getServerSideProp i...
const fetcher = (url) => fetch(url).then((r) => r.json()) // Для загрузка даних на фронтенді

export default function DProduct({
  serverData, //Вхідні дані з Сервера
  isDovidnuk = false, //Чи відкривати як довідник
  setDovActive, //Назва довідника
  setValue, //Для зміни Input в формі вводу даних
  setFocus, //Для передачі вибраних змінних в Form
}) {
  //= Загрузка даних на фронтенді useSWR ================================================================*/
  const { data, error } = useSWR(`${urlAPI}select-all`, fetcher, { initialData: serverData })

  if (error) return <div>не вдалося завантажити</div>
  if (!data) return <p>Loading/Завантаження ...</p>
  //**============================================================================================= */

  const Dovidnuk = () => {
    return (
      <div style={{ position: "absolute", width: "770px", height: "calc(100vh - 200px)", maxWidth: "calc(100vw" }}>
        {/* <div style={{ position: "relative", width: "780px", height: "calc(100vh)", maxWidth: "calc(100vw" }}> */}
        <Product
          data={data}
          isDovidnuk={true} //Якщо буде відкрито як довідник
          setDovActive={setDovActive} //Для закриття вікна довідника(setDovActive(""))
          setValue={setValue} //Для передачі вибраних змінних в Form
          setFocus={setFocus} //Для передачі фокусу у поле форми
        />
      </div>
    )
  }
  const NeDovidnuk = () => {
    return (
      <Layout>
        <div
          //   style={{ position: "relative", margin: "5px", width: "calc(100vw)", height: "calc(100vh - 150px)" }}
          style={{ position: "relative", width: "calc(100vw)", height: "calc(100vh - 120px)" }}
        >
          <Product data={data} />
        </div>
      </Layout>
    )
  }

  return <>{isDovidnuk ? <Dovidnuk /> : <NeDovidnuk />}</>
}

//= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  //onst response = await fetch("http://localhost:3000/api/shop/docs/doc_check_head/")
  const url = `${dbHost}${urlAPI}select-all` //->/[...slug].js
  const response = await fetch(url)
  const data = await response.json()

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
//*********************************************************************************** */

//--- Product -----------------------------------------------------------------
function Product({ data, isDovidnuk = false, setDovActive, setValue, setFocus }) {
  //data-дані,isDovidnuk-чи цей модуль буде відкритий як довідник
  //setDovActive-встановлює,який довідник викликається з форми коригування
  const titleTable = "Товари" //заголовок
  //   console.log("Product/setValue=", setValue)
  const { state, dispatch } = useContext(ComponentContext)
  const { theme, themeTypeLight } = state
  const router = useRouter() //для переходу на сторінки
  const gridRef = useRef(0)
  const [gridApi, setGridApi] = useState(null)
  const [rowData, setRowData] = useState()
  const [autoPageSize, setAutoPageSize] = useState(false)
  const [countSelectedRows, setCountSelectedRows] = useState(0) //к-сть виділених рядків
  const [selectedRowState, setSelectedRowState] = useState({}) //к-сть виділених рядків
  const [formActive, setFormActive] = useState(false) //Для відкриття/закриття форми
  const [toFormData, setToFormData] = useState({}) //Початкове значення для форми
  const [isAdd, setIsAdd] = useState(false) //Щоб знати для чого заходилось у форму(добавл чи кориг)
  // const [dataJson, setDataJson] = useState([]) // для convertToJson з EXELL/не зберігає до renderingy
  const dataJson = useRef([]) // для convertToJson з EXELL/зберігає до renderingy
  //   const insertRows = useRef(0) //к-сть записів вставлених з EXELL\Не працює
  const [isExell, setIsExell] = useState(false) //Чи йде імпорт з EXEL для ProgressBar

  //*** параметри і ф-ції AG_Grid **************************************** */
  // Для відображення фото в ячейці
  const ImgUrlCellRenderer = (params) => {
    // console.log("Product.js/imgUrlCellRenderer/params", params.value)
    return (
      <>
        <img height="100%" src={params.value} />
        {/* <img height="30" src={params.value} /> */}
      </>
    )
  }

  const columnDefs = useMemo(() => [
    //   const [columnDefs, setColumnDefs] = useState([
    {
      //   headerName: "#",
      //   field: "id",
      minWidth: 30,
      maxWidth: 30,
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

    { field: "price", headerName: "Ціна(грн)", minWidth: 120, type: "numericColumn", filter: "agNumberColumnFilter" },
    {
      field: "name",
      headerName: "Назва",
      minWidth: 300,
      flex: 5,
      filter: "agTextColumnFilter",
      //   filterParams: {
      //     buttons: ["reset", "apply"],
      //     debounceMs: 200,
      //   },
    },
    { field: "ov_id", hide: true }, //Прихований(hide) рядок
    { field: "ov", headerName: "Од.вим.", minWidth: 110 },

    { field: "skod", headerName: "ШтрихКод", minWidth: 120, filter: "agTextColumnFilter" },
    { field: "id", headerName: "Код", minWidth: 120 },
    { field: "pdv", headerName: "ПДВ(%)", minWidth: 120, type: "rightAligned" },
    { field: "akcuz", headerName: "Акциз(%)", minWidth: 120, type: "rightAligned" },
    { field: "category_id", hide: true }, //Прихований(hide) рядок
    { field: "category", headerName: "Категорія", minWidth: 150, flex: 2 },
    { field: "brand_id", hide: true }, //Прихований(hide) рядок
    { field: "brand", headerName: "Бренд", minWidth: 150, flex: 2 },
    { field: "uktzed", headerName: "УКТЗЕД", minWidth: 120 },
    {
      field: "is_discount",
      headerName: "^знижка",
      cellRenderer: "checkboxRenderer",
      minWidth: 120,
    },
    // {
    //   field: "is_discount",
    //   headerName: "^знижка",
    //   minWidth: 120,
    // },
    {
      field: "img",
      headerName: "Фото",
      cellRenderer: ImgUrlCellRenderer, //Ф-ція  cellRenderer повинна бути обявлена до приимінення //https://www.ag-grid.com/react-data-grid/component-cell-renderer/
      //   editable: true,
    },
  ])

  //   CheckboxRenderer = () => {
  //     return `<input type='checkbox' ${params.value ? "checked" : ""} />`
  //   }

  const defaultColDef = {
    flex: 1,
    width: 100,
    minWidth: 100,
    sortable: true,
    // filter: true,
    resizable: true,
    // cellRenderer: RendNumer,//Колір для парних рядків
    suppressDragLeaveHidesColumns: false,
    suppressSizeToFit: true, //автоматичне змінення розміру стовбця(до розміру екрану)
  }

  // //Для CheckboxRenderer
  const frameworkComponents = {
    checkboxRenderer: CheckboxRenderer,
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
    document.querySelector("#filterTextBox")?.focus() //Передати фокус в швидкий фільтер

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
    // console.log("Product.js/SelectionChanged/К-сть вибраних рядків=", countSelectedRows)
    // console.log("Product.js/SelectedRowState=", selectedRowState)
  }
  //------------------------------------------------------------------------------------------------------------ */
  const refreshState = () => {
    // console.log("Product.js/refreshState")
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
    // console.log("Product.js/rowAdd/formData=", formData)
    // console.log("Product.js/rowAdd/JSON.stringify(formData)=", JSON.stringify(formData))
    const url = "/api/shop/references/d_product/insert" //працює
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
      console.log(`Запис успішно добавленo`)
      //   console.log("Product.js/rowAdd/try/esponse.ok/resRow=", resRow)
      //   alert(`Запис успішно добавленo`)
      return resRow
    } else {
      const err = await response.json() //повертає тіло відповіді json
      //   alert(`Запис не добавлено! ${err.message} / ${err.stack}`)
      console.log(`Product.js/rowAdd/try/else/\ Помилка при добавленні запису\ ${err.message} / ${err.stack} `)
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
      //   console.log("Product/onEdit/selectRow  = ", selectRow)
      //****************************************** */
    } else {
      alert("Не вибрано ні одного запису для коригуввання")
    }
  }
  //--- Коригування запису(запит)
  const rowEdit = async (newRow) => {
    console.log("/agrid_users-pg/rowEdit//newRow= ", newRow)
    //Запит до сервера БД
    const url = "/api/shop/references/d_product/edit" //вибрати все-працює
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
      //   console.log("Product/onDelete/selRowsID  = ", selRowsID)
      rowsDelete(selRowsID)
    }
  }
  //--- Вилучення записів(запит)
  const rowsDelete = async (rows) => {
    // console.log("+++++f2-flex-table-psql.js/App/onDelete/rowDelete/rows=", rows);
    const url = "/api/shop/references/d_product/delete" //працює
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
    console.log("d_product.js/onCloseForm/formData=", formData)
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
  //***  Імпорт з EXELL в PostgreSQL ******************************** */
  //--   Функція для перетворення даних файлу Excel у формат JSON
  const convertToJson = async (headers, data) => {
    // console.log("exell_eventfile_table.js/convertToJson/data=", data)
    const rows = []
    //forEach-цикл
    data.forEach(async (row) => {
      let rowData = {}
      row.forEach(async (element, index) => {
        rowData[headers[index]] = element
      })
      //   console.log("exell_eventfile_table.js/convertToJson/rowData=", rowData)
      rows.push(rowData)
    })

    //
    dataJson.current = rows //dataJson = useRef([])-бо useState не мінялось?
    // console.log("exell_eventfile_table.js/convertToJson/dataJson.current=", dataJson.current)

    // setDataJson(rows) //збереження даних\не зберігає до renderingy
    // console.log("exell_eventfile_table.js/convertToJson/rows=", rows)
    return rows
  }

  //--   Функція імпорт з EXELL в PostgreSQ
  const handleImportExell = async (e) => {
    const file = e.target.files[0] //для читання файлу.
    const reader = new FileReader()
    //імпорт з EXELL в файл fileData
    reader.onload = async (event) => {
      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" }) //читання файлу excel
      const workSheetNane = workBook.SheetNames[0] //читання назви аркуша.
      const workSheet = workBook.Sheets[workSheetNane]
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 }) //читання даних файлу.
      const headers = fileData[0] //читання першого рядка як заголовка
      //   const heads = headers.map((head) => ({ tittle: head, field: head }))
      fileData.splice(0, 1)

      //*** Перетворення в формат Json в dataJson
      const jData = await convertToJson(headers, fileData)
      //   console.log("exell_eventfile_table.js/handleImportExell/rr=", jData)

      //*** Загрузка даних в PjstgreSQL
      const insertZap = await insertDB(jData) //Загрузка даних в PjstgreSQL
      //   const insertZap = insertDB(jData) //Загрузка даних в PjstgreSQL
      console.log("d_product.js/handleImportExell/insertZap=", insertZap)
    }
    reader.readAsBinaryString(file)
  }

  //   //--- Загрузка даних в PjstgreSQL / forEach
  //   const insertDB = () => {
  //     // console.log("d_product.js/insertDB//dataJson.current=", dataJson.current)

  //     let insertZap = 0
  //     try {
  //       //   dataJson.forEach((row) => {
  //       dataJson.current.forEach((row) => {
  //         //
  //         rowAdd(row) //Запис в БД(select)
  //         //
  //         insertZap = insertZap + 1
  //         insertRows.current = insertRows.current + 1
  //         console.log("d_product.js/insertDB/progres=", progres)
  //         // console.log("d_product.js/insertDB/insertRows.current=", insertRows.current)
  //         console.log("d_product.js/insertDB/insertZap=", insertZap)
  //       })
  //     } finally {
  //       //   console.log("d_product.js/insertDB/finally/insertRows.current=", insertRows.current)
  //       alert(`finally:Добавленo ${insertZap}`)
  //       //   insertRows.current=0
  //     }
  //     return insertZap
  //   }

  //--- Загрузка даних в DB / .map
  const insertDB = async () => {
    // console.log("d_product.js/insertDB//dataJson.current=", dataJson.current)

    let insertZap = 0
    try {
      //Цикл по rowData(запис в БД (doc_check_products)
      const addToDB = await dataJson.current.map((item, index) => {
        // console.log("doc_check_products.js/rowAddProductsFromArray/item=", item)
        //
        rowAdd(item) //Запис в БД(select)
        //
        insertZap = insertZap + 1
      })

    } finally {
      //   console.log("d_product.js/insertDB/finally/insertRows.current=", insertRows.current)
      await alert(`finally:Добавленo ${insertZap}`)
      //   insertRows.current=0
    }
    return insertZap
  }

  //При двойному кліку по рядку вибрати(Pick) значення з довідника і передати в input форми
  const onDoubleClicke = () => {
    if (isDovidnuk) toDov()
  }

  //Вибрати(Pick) значення з довідника і передати в input форми
  const toDov = () => {
    // console.log("Product.js/toDov/SelectedRowState=", selectedRowState["0"])
    setDovActive("")
    setValue("skod", selectedRowState["0"].skod)
    setValue("product_id", selectedRowState["0"].id)
    setValue("name", selectedRowState["0"].name)
    setValue("ov_id", selectedRowState["0"].ov_id)
    setValue("ov", selectedRowState["0"].ov)
    setValue("price", selectedRowState["0"].price)
    setFocus("quantity", { shouldSelect: true })

    // Router.back()//На попередню сторінку
  }

  //--- ExportExell */ Пацює привключеній опції "ag-grid-enterprise"
  const onExportExcel = useCallback(() => {
    alert("onExportExcel")
    gridRef.current.api.exportDataAsExcel()
  }, [])

  //   const onImportEXELL=()=>{
  //     setIsExell(true)
  //   }
  //******************************************************************* */
  //--- На друк
  const onPrint = () => {
    alert("onPrint")
  }
  //
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(document.getElementById("filterTextBox").value)
    //
  }, [])

  //   const onPrintQuickFilterTexts = useCallback(() => {
  //     gridRef.current.api.forEachNode(function (rowNode, index) {
  //       console.log("Row " + index + " quick filter text is " + rowNode.quickFilterAggregateText)
  //     })
  //   }, [])
  //
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* {insertRows.current > 0 ? <ProgressBar bgcolor={"#6a1b9a"} completed={60} /> : ""} */}
      {isExell && <ProductInsertPasgreSQL bgcolor={"#6a1b9a"} completed={60} />}
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
              <div className="agrid_head-container-right-notMobi">
                {/* File Uploader */}
                <div style={{ display: "flex", margin: "0" }}>
                  <input title="Імпорт з Exell" type="file" name="file" onChange={handleImportExell} accept=".xlsx" />
                </div>
              </div>
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
                  colorFill1={theme.colors.tableIcon1}
                />
              </button>
            </>
          )}
          <button className="agrid_head-nav-button" onClick={onCancel} title="Вийти">
            <IconCancel width="15" height="18" colorFill={theme.colors.tableIcon} />
          </button>
        </div>
        {/*  */}
      </div>
      <div className="agrid_head-title-mobi">
        <p>{titleTable}</p>
      </div>
      {/* PrintQuickFilterTexts */}
      <div className="filter-header">
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
          rowData={rowData}
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
          // onRowSelected={onRowSelected} ////Для вибору даних використовую ф-цію selectedRowState
          onSelectionChanged={onSelectionChanged} //Вибір клацанням на рядок
          onRowDoubleClicked={onDoubleClicke} //Подвійниц клік на рядку
          cacheQuickFilter={true}
          frameworkComponents={frameworkComponents} //Для checkBox
        ></AgGridReact>
      </div>
      {/* {formActive ? <ProductForm onCloseForm={onCloseForm} toFormData={toFormData} /> : ""} */}
      {formActive && <ProductForm onCloseForm={onCloseForm} toFormData={toFormData} />}
      {/* --- */}
      <style jsx>{`
        .agrid_head-container-right-notMobi,
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
          align-items: center;
          width: ${theme.size.dialogIconBorder};
          height: ${theme.size.dialogIconBorder};
          border-radius: ${theme.size.dialogIconBorder};
          color: ${theme.colors.tableIcon};
          border: 2px solid ${theme.colors.tableIconBorder};
          background-color: ${theme.colors.tableHeadBackground};
        }
        .agrid_head-nav-button:hover {
          cursor: pointer;
          background-color: ${theme.colors.tableIconBackgroundHover};
        }

        @media (min-width: 960px) {
          .agrid_head-title-mobi {
            display: none;
          }
          .agrid_head-title {
            display: block;
          }
          .agrid_head-container-right-notMobi {
            padding: 0.1vw;
            display: flex;
            justify-content: space-end; //   притискає до країв
            // align-items: center;
            // background-color: ${theme.colors.tableHeadBackground};
          }
          //
          .filter-header {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-size: 12px;
            font-weight: bold;
            margin-left: 5px;
            background-color: ${theme.colors.tableHeadBackground};
          }
        }
      `}</style>
    </div>
  )
}
