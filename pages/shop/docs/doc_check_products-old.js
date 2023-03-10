//doc_check_products.js //Товари в чеку-//Добавлення в масив
//Є PaymentDialo/ClientDialog/BackDialog
//Добавлення в масив і для agGrid оновлюю  масив setRowData(rows1)
//Початкові дані для agGrid з БД !!!
// Перерахунок знижки по клієнту
//При добаленні не створюєм шапку документа doc_check_head, а входим в документ(doc_check_products)
// ****** не раалізував ****
// № чеку для check_id,беремо з select-seqence (SELECT nextval('doc_check_head_id_seq')`)/ Не зміг реалізувати добвлення в doc_check_head з зарезервованим check_id(nextval)-> cannot insert a non-DEFAULT value into column "id" / undefined
//****************************************************************************** */
//При збереженні документа, в циклі добавляю шапку документа в doc_check_head з усіма даними з масивів  і отримавши doc_check_head.id  добавляю дані в таблицю doc_check_products, де nom_check=doc_check_head.id

//*** Для agGrid **** */ */
import useSWR from "swr" //https://www.setup.pp.ua/2020/06/useswr-react.html
import { useEffect, useContext, useMemo, useState, useCallback, useRef } from "react"
import { useRouter } from "next/router"
import { AgGridReact } from "ag-grid-react"
// import "ag-grid-enterprise" //Для EXELL/Дає помилку червоні зірочки, бо не ліцензований
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
// import "ag-grid-community/dist/styles/ag-theme-balham.css"
//
import { dbHost } from "../../../config/dbHost"
import { pool } from "../../../config/dbShop"

import { ComponentContext } from "../../../context/ComponentContext"
import IconAdd from "../../../components/ui/svg/table/IconAdd"
import IconPencil_c3 from "../../../components/ui/svg/table/IconPencil_c3"
import IconCancel from "../../../components/ui/svg/head/IconCancel"
import IconRefresh from "../../../components/ui/svg/table/IconRefresh"
import IconTrash from "../../../components/ui/svg/table/IconTrash_с2" //Корзина
import IconMoon_border from "../../../components/ui/svg/head/IconMoon_border"
import IconSun_border from "../../../components/ui/svg/head/IconSun_border"
import IconTable_c2 from "../../../components/ui/svg/table/IconTable_c2"
import IconExport from "../../../components/ui/svg/table/IconExport"
import IconClientMale from "../../../components/ui/svg/table/IconClientMale"
import IconPaymentMethod from "../../../components/ui/svg/table/IconPaymentMethod"
import IconPrinter_c2 from "../../../components/ui/svg/head/IconPrinter_c2" //Принтер
import DocCheckProductsForm from "../../../components/Shop/Docs/DocCheckProducts/DocCheckProductsForm"
import PaymentDialog from "../../../components/Shop/DialogForms/PaymentDialog"
import ClientDialog from "../../../components/Shop/DialogForms/ClientDialog"
import BackDialog from "../../../components/Shop/DialogForms/BackDialog"

//*************************************************************************************** */
const urlAPI = "/api/shop/docs/doc_check_products/" // Для useSWR/getServerSideProp i...
const fetcher = (url) => fetch(url).then((res) => res.json()) // Для useSWR

export default function DocCheckProducts({ serverData, setDocContent, headData, setHeadData }) {
  //serverData-Вхідні дані з Сервера/ setDocContent-Назва документа(для закриття док)/headData-Дані шапки документу
  //   console.log("doc_check_products.js/headData0=", headData)

  //--- Загрузка даних на фронтенді useSWR
  // ("/api/shop/docs/doc_check_products/"
  const { data, error } = useSWR(`${urlAPI}${headData.id}`, fetcher, {
    //   const { data, error } = useSWR(`${urlAPI}33`, fetcher, {
    // refreshInterval: 0,
  })

  if (error) return <div>не вдалося завантажити</div>
  if (!data) return <p>Loading/Завантаження ...</p>
  //---
  return (
    <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
      {/* <div style={{ position: "relative", width: "calc(100vw)", height: "calc(100vh - 350px)" }}> */}
      <GDocCheckProducts data={data} setDocContent={setDocContent} headData={headData} setHeadData={setHeadData} />
    </div>
  )
}
//= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  //   const url = `${dbHost}${urlAPI}${headData.id}` //->/[...slug].js
  //   const response = await fetch(url)
  //   const data = await response.json()
  //**************************** */
  let data = {}
  const res = await pool.connect((err, client, done) => {
    const sql = `SELECT id,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,check_id,doc_check_products.ov_id,doc_check_products.price,quantity,discount,round((doc_check_products.price*quantity-discount),2) AS total,d_product.name AS name,d_ov.name AS ov FROM doc_check_products JOIN d_product ON d_product.id = doc_check_products.product_id JOIN d_ov ON d_ov.id = doc_check_products.ov_id WHERE doc_check_products.check_id = ${headData.id} ORDER BY id DESC`
    // const sql = `SELECT doc_check_products.id,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,check_id,doc_check_products.ov_id,doc_check_products.price,quantity,discount,round((doc_check_products.price*quantity-discount),2) AS total,d_product.name AS name,d_ov.name AS ov FROM doc_check_products JOIN d_product ON d_product.id = doc_check_products.product_id JOIN d_ov ON d_ov.id = doc_check_products.ov_id WHERE doc_check_products.check_id = ${headData.id} ORDER BY id DESC`
    // const sql = "select * from d_category ORDER BY id DESC"
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
//************************************************************ */

function GDocCheckProducts({
  data, // Рядки документа
  setDocContent, //Для виходу з документу setDocContent("")
  headData, //
  setHeadData = { setHeadData },
}) {
  const iconSize = "15px"
  const newDoc = headData.newDoc ? "*добавляється*" : ""
  const titleTable = `${newDoc}  Товари в чеку №: ` //заголовок
  //
  const { state, dispatch } = useContext(ComponentContext)
  const { theme, themeTypeLight } = state
  const router = useRouter() //для переходу на сторінки
  const gridRef = useRef(0)
  const [gridApi, setGridApi] = useState(null)
  const [rowData, setRowData] = useState() //Масив рядків agGrid
  const [autoPageSize, setAutoPageSize] = useState(false)
  const [countSelectedRows, setCountSelectedRows] = useState(0) //к-сть виділених рядків
  const [selectedRowState, setSelectedRowState] = useState({}) //к-сть виділених рядків
  const [formActive, setFormActive] = useState(false) //Для відкриття/закриття форми
  const [isAdd, setIsAdd] = useState(false) //Щоб знати для чого заходилось у форму(добавл чи кориг)
  const [isPaymentDialog, setIsPaymentDialog] = useState(false) //Діалог оплати
  const [isClientDialog, setIsClientDialog] = useState(false) //Діалог введення клієнта
  const [isBackDialog, setIsBackDialog] = useState(false) //Діалог виходу з програми
  const [toFormData, setToFormData] = useState({}) //Початкове значення для форми

  //--- Шапка документа
  const DocHead = () => {
    return (
      <div className="headItemWrapper">
        <div className="headItem">
          <label className="label2">Kлієнт:</label>
          <p className="sum2">{headData.client}</p>
        </div>
        <div className="headItem" style={{ minWidth: 50, marginLeft: "5px", paddingLeft: "5px" }}>
          <label className="label1">Сума:</label>
          <p className="sum1">{Number(headData.total).toFixed(2)}</p>
          <label className="label1">грн</label>
        </div>
        <div className="headItem">
          <label className="label2">Знижка:</label>
          <p className="sum2">
            {/* {Number(headData.discount).toFixed(2)}грн.{" / "} */}
            {Number(headData.discount).toFixed(2)}грн.{" / "}
            {Number(headData.discount_proc)}%
          </p>
        </div>
        <div className="headItem">
          <label className="label1">До оплати:</label>
          {/* <p className="sum1">{(Number(headData.total) * (1 - Number(headData.discount_proc) / 100)).toFixed(2)}</p> */}
          <p className="sum1">{(Number(headData.total) - Number(headData.discount)).toFixed(2)}</p>
          <label className="label1">грн.</label>
        </div>
        <style jsx>{`
          .headItemWrapper {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            border-ltft: 1px solid ${theme.colors.tableHeadBorder};
            // border-top: 1px solid ${theme.colors.tableHeadBorder};
            border-right: 1px solid ${theme.colors.tableHeadBorder};
            background-color: ${theme.colors.docHeadBackground};
          }
          .headItem {
            display: flex;
            margin-left: 5px;
            max-width: 400;
            align-items: center; //Текст поцентру при display: flex;
            // align-items: flex-end; //Текст внизу при display: flex;
            flex-wrap: wrap; //перености у flex
          }
          .label1 {
            padding-right: 15px;
            font-weight: 500;
            font-size: 30px;
            color: ${theme.colors.dialogLabel1};
          }
          .sum1 {
            display: flex;
            font-size: 35px;
            // line-height: 130%; //Прижати текст вниз залежно від шрифта(100%=висоті шрифта)
            color: ${theme.colors.dialogSum1};
          }
          .label2 {
            padding-right: 15px;
            font-weight: 500;
            font-size: 20px;
            color: ${theme.colors.dialogLabel2};
          }
          .sum2 {
            display: flex;
            font-size: 25;
            // line-height: 130%; //Прижати текст вниз залежно від шрифта(100%=висоті шрифта)
            color: ${theme.colors.dialogSum2};
          }
          @media (min-width: 960px) {
            .headItemWrapper {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              flex-wrap: wrap;
            }
          }
        `}</style>
      </div>
    )
  }

  //*** параметри і ф-ції AG_Grid **************************************** */

  //Розрахунок поля tatal
  const tatalValueGetter = (params) => {
    return params.data.quantity * params.data.price - params.data.discount
  }

  //   const [columnDefs, setColumnDefs] = useState([
  const columnDefs = useMemo(
    () => [
      //??? Якщо включено sizeColumnsToFit, то не працює параметр flex:1/flex:2...
      {
        //   headerName: "#",
        //   field: "id",
        minWidth: 20,
        maxWidth: 20,
        checkboxSelection: true, //
        headerCheckboxSelection: true, //Добавляє в шапку
        sortable: false,
        suppressMenu: true,
        filter: false,
        resizable: false,
        lockPosition: "left", //блокує стовпець з одного боку сітки "left"або "right",(перетякування інших не діє)
        suppressMovable: true, //Заборона перетягнути заголовок стовпця.
        suppressSizeToFit: true, // заборона на автоматичне змінення розміру стовбця(до розміру екрану)
      },
      { field: "id", hide: true }, //Прихований(hide) рядок
      //   { field: "product_id", hide: true }, //Прихований(hide) рядок
      { field: "name", headerName: "Назва товару", minWidth: 230, flex: 5 }, //Прихований(hide) рядок
      { field: "quantity", headerName: "Кількість", type: "numericColumn", minWidth: 110 },
      { field: "ov_id", hide: true }, //Прихований(hide) рядок
      { field: "ov", headerName: "Од.вим.", minWidth: 110 },
      { field: "price", headerName: "Ціна(грн)", type: "numericColumn", minWidth: 100, flex: 2 },
      { valueGetter: tatalValueGetter, headerName: "*Сума(грн)", type: "numericColumn", minWidth: 100, flex: 2 },
      { field: "discount", headerName: "Знижка(грн)", type: "rightAligned", minWidth: 100, flex: 2 },
      // { field: "datetime", headerName: "Час створення", minWidth: 160, flex: 2 }, //Прихований(hide) рядок
      // { field: "check_id", headerName: "№чека", minWidth: 60 },
    ],
    []
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

  // загрузка даних в Agrid
  const onGridReady = (params) => {
    if (gridApi) {
      //??? Якщо включено sizeColumnsToFit, то не працює параметр flex:1/flex:2...
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
    // console.log("doc_check_products.js/SelectionChanged/К-сть вибраних рядків=", countSelectedRows)
    // console.log("doc_check_products.js/SelectedRowState=", selectedRowState)
  }
  //------------------------------------------------------------------------------------------------------------ */

  //Перемальовує всі рядки
  const redrawAllRows = useCallback(() => {
    // console.log("d_doc_check_products.js/redrawAllRows/rowData=", rowData)
    // alert("redrawAllRows")
    //   progressColor()
    gridRef.current.api.redrawRows()
  }, [])

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
  //** end-agGrid ******************************************************* */

  //== ExportExell */ Пацює при включеній опції "ag-grid-enterprise"
  const onExportExcel = useCallback(() => {
    alert("onExportExcel")
    gridRef.current.api.exportDataAsExcel()
  }, [])

  //== На друк/Поки не працює
  const onPrint = () => {
    alert("onPrint")
  }
  //***************************************************** */

  //== Вихід з компоннта(Виклик діалогу виходу)
  const onCancel = () => {
    // alert("onCancel")
    setDocContent("") //Вихід з компоннта без збереження даних
    // setIsBackDialog(true) //Виклик діалогу виходу
  }

  //== Виклик діалогу вводу клієнта
  const onClient = () => {
    // alert("onClient")
    setIsClientDialog(true)
  }

  //== Виклик діалогу оплати
  const onPaymentDialog = () => {
    // alert("onPaymentDialog")
    setIsPaymentDialog(true)
  }

  //== Вихід з PaymentDialog
  const exitPaymentDialog = (par) => {
    // alert("exitPaymentDialog",par)
    if (par === 1) {
      //Записс даних в БД
      rowAddProductsFromArray() //Запис в БД  doc_check_products
    } else setDocContent("") //Вихід з компоннта без збереження даних
  }

  //== Вихід з BackDialog
  const exitBackDialog = (par) => {
    alert("exitBackDialog", par)
    if (par === 1) {
      //Записс даних в БД
      rowAddProductsFromArray() //Запис в БД  doc_check_products
    } else setDocContent("") //Вихід з компоннта без збереження даних
  }

  //   //== Вихід з компоннта без збереження даних
  //   const exitWithout = () => {
  //     alert("exitWithout ")
  //     if (setDocContent) setDocContent("") //Вихід з компоннта без збереження даних
  //     else router.push("/")
  //   }

  //*** Add/Edit/Delete/Cancel ===============================*/

  //== Закриття форми вводу даних і виклик ф-цій запису в БД(масив) -*/
  const onCloseForm = (formData) => {
    //formData-дані з форми
    // console.log("d_doc_check_products.js/onCloseForm/formData=", formData)

    setFormActive(false) //Закриваєм форрму

    //Якщо є дані з форми
    if (formData) {
      if (isAdd) rowAddToArray(formData) //Добавлення в масив
      //   if (isAdd) rowAdd(formData) //Добавлення в БД
      else rowEdit(formData) //Виклик ф-ції запису в БД
      // setRowData(data)
    }
  }

  //== Добавалення запису (кнопка/виклик форми (саме добавлення в onCloseForm)) -*/
  const onAdd = () => {
    setIsAdd(true) //Для форми(добавлення чи коригування)
    // setFormData(null) //Пусті дані в форму
    setToFormData(null) //Пусті дані в форму
    setFormActive(true) //Відкриваємо форму для занесення інфи
  }

  //== Добавленн запису в масив agGrid
  const rowAddToArray = (newRow) => {
    // Новий рядок-міняємєм знижку(грн)
    const discountRow = (
      (Number(newRow.price) * Number(newRow.quantity) * Number(headData.discount_proc)) /
      100
    ).toFixed(2)
    newRow.discount = discountRow //Міняєо знижку в добавленому рядку

    // Шапка документу(Сума)
    const sumHead = (Number(headData.total) + Number(newRow.price) * Number(newRow.quantity)).toFixed(2) //Загальна сума
    // Шапка документу(Знижка грн)
    const discountHead = Number(headData.discount) + Number(discountRow) //Знижка в грн
    // console.log("d_doc_check_products.js/rowAddToArray/newRow=", newRow)
    setHeadData((state) => ({ ...state, total: sumHead }))
    setHeadData((state) => ({ ...state, discount: discountHead }))

    //Додавання рядка в масив рядків agGrid
    console.log("d_doc_check_products.js/rowAddToArray/rowData=", rowData)
    const rows1 = [...rowData] //копіюємо поточний масив рядків agGrid
    // rows1.push({ ...newRow }) //добавляємо в кінець масиву рядків agGrid
    rows1.unshift({ ...newRow }) //добавляємо в початок масиву рядків agGrid
    // console.log("d_doc_check_products.js/rowAddToArray/rows1=", rows1)

    setRowData(rows1) //Обновлює масив рядків agGrid
    redrawAllRows() //Перемальовує рядки agGrid
  }

  //== Запис в БД  doc_check_products(з масиву)
  const rowAddProductsFromArray = async () => {
    let insertZap = 0
    try {
      const resRowHead = await rowAddHead() //запис шапки в БД(doc_check_head)
      console.log("doc_check_products.js/rowAddProductsFromArray/resRowHead=", resRowHead)

      console.log("doc_check_products.js/rowAddProductsFromArray/rowData=", rowData)
      //Цикл по rowData(запис в БД (doc_check_products)
      const addToDB = await rowData.map((item, index) => {
        console.log("doc_check_products.js/rowAddProductsFromArray/item=", item)
        item.check_id = resRowHead //Чекам присвоюємо значення реальне id шапки док.
        //
        rowAdd(item, resRowHead) //Запис в БД(select)
        //
        insertZap = insertZap + 1
      })
    } finally {
      //   console.log("doc_check_products.js/insertPostgreSQL/finally/insertRows.current=", insertRows.current)
      alert(`finally:Добавленo записів: ${insertZap}`)
      setDocContent("") //Вихід з компоннта без збереження даних
    }
    // return insertZap
  }

  //== Добавалення запису в БД(doc_check_head)
  const rowAddHead = async () => {
    console.log("doc_check_products.js/rowAddHead/headData=", headData)
    //Рядок для запису в doc_check_products:
    const addRow = {
      // id: headData.id, //
      departament_id: headData.departament_id, //Add
      place: headData.place, //Add
      user_id: headData.user_id, //Add
      client_id: headData.client_id, //Add 1-по замовчуванню
      total: headData.total, //Add 1-по замовчуванню
      discount: headData.discount, //Add 1-по замовчуванню
    }
    // console.log("doc_check_products.js/rowAddHead/JSON.stringify(formData)=", JSON.stringify(formData))

    const url = "/api/shop/docs/doc_check_head/insert" //працює
    const options = {
      method: "POST",
      //   body: JSON.stringify(formData), //Для запитів до серверів використовувати формат JSON
      body: JSON.stringify(addRow), //Для запитів до серверів використовувати формат JSON
      headers: {
        "Content-Type": "application/json", //Вказує на тип контенту
      },
    }

    const response = await fetch(url, options) //Запит

    if (response.ok) {
      // якщо HTTP-статус в диапазоне 200-299
      const resRow = await response.json() //повертає тіло відповіді json
      console.log("doc_check_products.js/rowAddHead/try/response.ok/resRow=", resRow)
      alert(`Запис успішно добавленo`)

      return resRow.id
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Запис не добавлено! ${err.message} / ${err.stack}`)
      //   console.log(`Product.js/rowAddHead/try/else/\ Помилка при добавленні запису\ ${err.message} / ${err.stack} `)
    }
  }

  //== Добавалення запису в БД(doc_check_products)
  const rowAdd = async (row, resRowHead) => {
    // console.log("doc_check_products.js/rowAdd/headData=", headData)
    // console.log("doc_check_products.js/rowAdd/formData=", row)

    //Рядок для запису в doc_check_products:
    const addRow = {
      //   check_id: headData.id, //
      departament_id: headData.departament_id, //Add
      place: headData.place, //Add
      user_id: headData.user_id, //Add
      client_id: headData.client_id, //Add 1-по замовчуванню
      //
      check_id: resRowHead, //Зммінив при добавленні шапки в БД
      product_id: row.product_id, //Add+Edit
      ov_id: row.ov_id, //Add+Edit
      price: row.price, //Add+Edit//Add+Edit//Add
      quantity: row.quantity, //Add+Edit
      discount: row.discount, //Знижка в грн
    }
    console.log("doc_check_products.js/rowAdd/addRow=", addRow)
    // console.log("Product.js/rowAdd/JSON.stringify(formData)=", JSON.stringify(formData))

    const url = "/api/shop/docs/doc_check_products/insert" //працює
    const options = {
      method: "POST",
      //   body: JSON.stringify(formData), //Для запитів до серверів використовувати формат JSON
      body: JSON.stringify(addRow), //Для запитів до серверів використовувати формат JSON
      headers: {
        "Content-Type": "application/json", //Вказує на тип контенту
      },
    }

    const response = await fetch(url, options) //Запит

    if (response.ok) {
      // якщо HTTP-статус в диапазоне 200-299
      const resRow = await response.json() //повертає тіло відповіді json
      //   console.log("Product.js/rowAdd/try/esponse.ok/resRow=", resRow)
      //   alert(`Запис успішно добавленo`)

      return resRow
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Запис не добавлено! ${err.message} / ${err.stack}`)
      //   console.log(`Product.js/rowAdd/try/else/\ Помилка при добавленні запису\ ${err.message} / ${err.stack} `)
    }
  }

  //== Коригування записів(кнопка)
  const onEdit = () => {
    if (countSelectedRows > 0) {
      const selectRow = selectedRowState["0"] //Значення всіх полів 0-го виділеного рядка
      const selectRow1 = selectedRowState //Значення всіх полів 0-го виділеного рядка
      setIsAdd(false) //Для форми(добавлення чи коригування)
      //   setFormData(selectRow) //Дані з вибраного запису в форму
      setToFormData(selectRow) //Дані з вибраного запису в форму
      setFormActive(true) //Відкриваємо форму для занесення інфи
      // rowEdit(formData)// переніс в onCloseForm, бо зразу спрацьовувало
      console.log("GDocCheckProducts/onEdit/selectRow  = ", selectRow)
      console.log("GDocCheckProducts/onEdit/selectRow1  = ", selectRow1)
      //****************************************** */
    } else {
      alert("Не вибрано ні одного запису для коригуввання")
    }
  }

  //   //== Коригування запису(запит)
  //   const rowEdit = async (newRow) => {
  //     // console.log("/agrid_users-pg/rowEdit//newRow= ", newRow)
  //     //Запит до сервера БД
  //     const url = "/api/shop/docs/doc_check_products/edit" //вибрати все-працює
  //     const options = {
  //       method: "PUT",
  //       body: JSON.stringify(newRow),
  //       // headers: {
  //       //   "Content-Type": "application/json", //Вказує на тип контенту
  //       // },
  //     }
  //     const response = await fetch(url, options)
  //     // alert("+++psql-...-fetch.js/PUT/response.status= " + response.status);
  //     if (response.ok) {
  //       // если HTTP-статус в диапазоне 200-299
  //       const resEdit = await response.json() //повертає тіло відповіді json
  //       alert(`Змінено ${resEdit} записів`)
  //     } else {
  //       const err = await response.json() //повертає тіло відповіді json
  //       alert(`Помилка зміни записів! ${err.message} / ${err.stack}`)
  //       // console.log(`+++psql-...-fetch.js/UPDATE/ ${err.message} / ${err.stack} `);
  //     }
  //   }

  //== Коригування запису(запит)
  const rowEdit = async (newRow) => {
    // Новий рядок-міняємєм знижку(грн)
    const discountRow = (
      (Number(newRow.price) * Number(newRow.quantity) * Number(headData.discount_proc)) /
      100
    ).toFixed(2)
    newRow.discount = discountRow //Міняєо знижку в добавленому рядку

    // Шапка документу(Сума)
    const sumHead = (Number(headData.total) + Number(newRow.price) * Number(newRow.quantity)).toFixed(2) //Загальна сума
    // Шапка документу(Знижка грн)
    const discountHead = Number(headData.discount) + Number(discountRow) //Знижка в грн
    // console.log("d_doc_check_products.js/rowAddToArray/newRow=", newRow)
    setHeadData((state) => ({ ...state, total: sumHead }))
    setHeadData((state) => ({ ...state, discount: discountHead }))
  }

  //== Вилучення записів(кнопка)
  const onDelete = () => {
    if (countSelectedRows > 0) {
      const selRowsID = selectedRowState.map((item) => +item.id) // Створюємо(+) масив id-рядків для вилучення /
      //   console.log("GDocCheckProducts/onDelete/selRowsID  = ", selRowsID)
      rowsDelete(selRowsID)
    }
  }

  //== Вилучення записів(запит)
  const rowsDelete = async (rows) => {
    console.log("+++++f2-flex-table-psql.js/App/onDelete/rowDelete/rows=", rows)
    const url = "/api/shop/docs/doc_check_products/delete" //працює
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

  //== Перерехунок знижки по клієнту
  const discountRecalc = (rezSelect) => {
    // Шапка документу(Знижка грн)
    // const discountHead = Number(headData.discount) + Number(discountRow) //Знижка в грн

    setHeadData((state) => ({ ...state, client_id: rezSelect.id }))
    setHeadData((state) => ({ ...state, client: `${rezSelect.name} ${rezSelect.last_name}` }))
    setHeadData((state) => ({ ...state, discount_proc: rezSelect.discount_proc }))
    // console.log("doc_check_products.js/discountRecalc/rowData=", rowData)

    const rows1 = [...rowData] //копіюємо поточний масив рядків agGrid
    //Перерахунок рядків
    let discountHead = 0
    rows1.map((item, index) => {
      // Рядок док./перерахунок знижки(грн)
      item.discount = ((Number(item.quantity) * Number(item.price) * Number(rezSelect.discount_proc)) / 100).toFixed(2)
      //   console.log("doc_check_products.js/discountRecalc/item.discount=", item.discount)

      // Шапка документу(Знижка грн)
      discountHead = Number(discountHead) + Number(item.discount)
      //   setHeadData((state) => ({ ...state, discount: Number(state.discount) + Number(item.discount) }))
      //   console.log("doc_check_products.js/discountRecalc/item1=", item)
      //   console.log("doc_check_products.js/discountRecalc/headData=", headData)
    })
    setHeadData((state) => ({ ...state, discount: discountHead }))
    // console.log("doc_check_products.js/discountRecalc/rows1=", rows1)

    setRowData(rows1) //Обновлює масив рядків agGrid
    redrawAllRows() //Перемальовує рядки agGrid
  }

  //===================================================================

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Діалог виходу з форми */}
      {/* {isOutDialog && <RenderOutDialog />} */}
      {isPaymentDialog && (
        <PaymentDialog
          setIsPaymentDialog={setIsPaymentDialog}
          exitPaymentDialog={exitPaymentDialog}
          total={(Number(headData.total) * (1 - Number(headData.discount_proc) / 100)).toFixed(2)}
        />
      )}
      {isClientDialog && (
        <ClientDialog setIsClientDialog={setIsClientDialog} setHeadData={setHeadData} discountRecalc={discountRecalc} />
      )}
      {isBackDialog && <BackDialog setIsBackDialog={setIsBackDialog} exitBackDialog={exitBackDialog} />}
      <div className="agrid_head-container">
        <div className="agrid_head-container-left">
          <>
            <button className="agrid_head-nav-button" onClick={changeTheme} title="Зміна теми">
              {themeTypeLight ? (
                // <IconMoon_border width="18" height="18" colorFill={theme.colors.tableIcon} />
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
            <button className="agrid_head-nav-button" onClick={redrawAllRows} title="Обновити дані">
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
                  colorFill1={theme.colors.tableIcon}
                />
              </button>
            ) : (
              ""
            )}
            <select
              className="agrid_head-nav-button"
              style={{ width: "48px" }}
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
          {/* )} */}
        </div>
        {/*  */}
        <div className="agrid_head-title">
          {titleTable} {headData.id}
        </div>
        {/* <div>Імпортовано: {insertRows.current} зап.</div> */}
        {/*  */}
        <div className="agrid_head-container-right">
          <div className="agrid_head-container-right-notMobi">
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
          </div>
          <button className="agrid_head-nav-button" onClick={onPaymentDialog} title="Оплата">
            <IconPaymentMethod
              width={theme.size.tableIcon}
              height={theme.size.tableIcon}
              colorFill={theme.colors.tableIcon}
            />
          </button>
          <button className="agrid_head-nav-button" onClick={onClient} title="Клієнт">
            <IconClientMale
              width={theme.size.tableIcon}
              height={theme.size.tableIcon}
              colorFill={theme.colors.tableIcon}
            />
          </button>
          {/* <button className="agrid_head-nav-button" onClick={onCancelPaymentDialog} title="Вийти"> */}
          <button className="agrid_head-nav-button" onClick={onCancel} title="Вийти">
            <IconCancel width={theme.size.tableIcon} height={theme.size.tableIcon} colorFill={theme.colors.tableIcon} />
          </button>
        </div>
      </div>
      <div className="agrid_head-title-mobi">
        <p>
          {titleTable} {headData.id}
        </p>
      </div>

      {/* Шапка документу */}
      {<DocHead />}

      <div
        style={{ height: "calc(100% - 50px)" }}
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
          rowSelection="multiple" //дозволяє вибирати рядки клацанням миші
          // onRowSelected={onRowSelected} ////Для вибору даних використовую ф-цію selectedRowState
          onSelectionChanged={onSelectionChanged} //Вибір клацанням на рядок
          //   onRowDoubleClicked={onDoubleClicke}
        ></AgGridReact>
      </div>
      {formActive && <DocCheckProductsForm onCloseForm={onCloseForm} toFormData={toFormData} />}
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
        }
      `}</style>
    </div>
  )
}
