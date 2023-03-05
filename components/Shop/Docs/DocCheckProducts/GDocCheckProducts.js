//GDocCheckProducts.js //Товари в чеку-//Добавлення в масив
//Є PaymentDialo/ClientDialog/BackDialog
//Добавлення в масив і для agGrid оновлюю  масив setRowData(rows1)
//Початкові дані для agGrid з БД !!!
// Перерахунок знижки по клієнту
//При добаленні не створюєм шапку документа doc_check_head, а входим в документ(GDocCheckProducts)
// ****** не раалізував ****
// № чеку для check_id,беремо з select-seqence (SELECT nextval('doc_check_head_id_seq')`)/ Не зміг реалізувати добвлення в doc_check_head з зарезервованим check_id(nextval)-> cannot insert a non-DEFAULT value into column "id" / undefined
//****************************************************************************** */
//При збереженні документа, в циклі добавляю шапку документа в doc_check_head з усіма даними з масивів  і отримавши doc_check_head.id  добавляю дані в таблицю GDocCheckProducts, де nom_check=doc_check_head.id

import useSWR from "swr" //https://www.setup.pp.ua/2020/06/useswr-react.html
import { useContext, useMemo, useState, useCallback, useRef } from "react"
import { useRouter } from "next/router"
import { ComponentContext } from "../../../../context/ComponentContext"
import DocCheckProductsForm from "./DocCheckProductsForm"
import AgGrid from "../../../AgGridModules/AgGrid"
import PaymentDialog from "../../DialogForms/PaymentDialog"
import ClientDialog from "../../DialogForms/ClientDialog"
import BackDialog from "../../DialogForms/BackDialog"

//
const urlAPI = "/api/shop/docs/doc_check_products/" // Для useSWR/getServerSideProp i...
const fetcher = (url) => fetch(url).then((res) => res.json()) // Для useSWR

export default function GDocCheckProducts({
  serverData, // Рядки документа
  setDocContent, //Для виходу з документу setDocContent("")
  headData, //
  setHeadData = { setHeadData },
}) {
  console.log("GDocCheckProducts.js")
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
    // console.log("GDocCheckProducts.js/SelectionChanged/К-сть вибраних рядків=", countSelectedRows)
    // console.log("GDocCheckProducts.js/SelectedRowState=", selectedRowState)
  }
  //------------------------------------------------------------------------------------------------------------ */

  //Перемальовує всі рядки
  const redrawAllRows = useCallback(() => {
    // console.log("d_GDocCheckProducts.js/redrawAllRows/rowData=", rowData)
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
      rowAddProductsFromArray() //Запис в БД  GDocCheckProducts
    } else setDocContent("") //Вихід з компоннта без збереження даних
  }

  //== Вихід з BackDialog
  const exitBackDialog = (par) => {
    alert("exitBackDialog", par)
    if (par === 1) {
      //Записс даних в БД
      rowAddProductsFromArray() //Запис в БД  GDocCheckProducts
    } else setDocContent("") //Вихід з компоннта без збереження даних
  }

  //*** Add/Edit/Delete/Cancel ===============================*/

  //== Закриття форми вводу даних і виклик ф-цій запису в БД(масив) -*/
  const onCloseForm = (formData) => {
    //formData-дані з форми
    // console.log("d_GDocCheckProducts.js/onCloseForm/formData=", formData)

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
    // console.log("d_GDocCheckProducts.js/rowAddToArray/newRow=", newRow)
    setHeadData((state) => ({ ...state, total: sumHead }))
    setHeadData((state) => ({ ...state, discount: discountHead }))

    //Додавання рядка в масив рядків agGrid
    console.log("d_GDocCheckProducts.js/rowAddToArray/rowData=", rowData)
    const rows1 = [...rowData] //копіюємо поточний масив рядків agGrid
    // rows1.push({ ...newRow }) //добавляємо в кінець масиву рядків agGrid
    rows1.unshift({ ...newRow }) //добавляємо в початок масиву рядків agGrid
    // console.log("d_GDocCheckProducts.js/rowAddToArray/rows1=", rows1)

    setRowData(rows1) //Обновлює масив рядків agGrid
    redrawAllRows() //Перемальовує рядки agGrid
  }

  //== Запис в БД  GDocCheckProducts(з масиву)
  const rowAddProductsFromArray = async () => {
    let insertZap = 0
    try {
      const resRowHead = await rowAddHead() //запис шапки в БД(doc_check_head)
      console.log("GDocCheckProducts.js/rowAddProductsFromArray/resRowHead=", resRowHead)

      console.log("GDocCheckProducts.js/rowAddProductsFromArray/rowData=", rowData)
      //Цикл по rowData(запис в БД (GDocCheckProducts)
      const addToDB = await rowData.map((item, index) => {
        console.log("GDocCheckProducts.js/rowAddProductsFromArray/item=", item)
        item.check_id = resRowHead //Чекам присвоюємо значення реальне id шапки док.
        //
        rowAdd(item, resRowHead) //Запис в БД(select)
        //
        insertZap = insertZap + 1
      })
    } finally {
      //   console.log("GDocCheckProducts.js/insertPostgreSQL/finally/insertRows.current=", insertRows.current)
      alert(`finally:Добавленo записів: ${insertZap}`)
      setDocContent("") //Вихід з компоннта без збереження даних
    }
    // return insertZap
  }

  //== Добавалення запису в БД(doc_check_head)
  const rowAddHead = async () => {
    console.log("GDocCheckProducts.js/rowAddHead/headData=", headData)
    //Рядок для запису в шапку документа: doc_check_hea:
    const addRow = {
      // id: headData.id, //
      departament_id: headData.departament_id, //Add
      place: headData.place, //Add
      user_id: headData.user_id, //Add
      client_id: headData.client_id, //Add 1-по замовчуванню
      total: headData.total, //Add 1-по замовчуванню
      discount: headData.discount, //Add 1-по замовчуванню
    }
    // console.log("GDocCheckProducts.js/rowAddHead/JSON.stringify(formData)=", JSON.stringify(formData))

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
      console.log("GDocCheckProducts.js/rowAddHead/try/response.ok/resRow=", resRow)
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
    // console.log("GDocCheckProducts.js/rowAdd/headData=", headData)
    // console.log("GDocCheckProducts.js/rowAdd/formData=", row)

    //Рядок для запису в GDocCheckProducts:
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
    console.log("GDocCheckProducts.js/rowAdd/addRow=", addRow)
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
    // console.log("d_GDocCheckProducts.js/rowAddToArray/newRow=", newRow)
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
    // console.log("GDocCheckProducts.js/discountRecalc/rowData=", rowData)

    const rows1 = [...rowData] //копіюємо поточний масив рядків agGrid
    //Перерахунок рядків
    let discountHead = 0
    rows1.map((item, index) => {
      // Рядок док./перерахунок знижки(грн)
      item.discount = ((Number(item.quantity) * Number(item.price) * Number(rezSelect.discount_proc)) / 100).toFixed(2)
      //   console.log("GDocCheckProducts.js/discountRecalc/item.discount=", item.discount)

      // Шапка документу(Знижка грн)
      discountHead = Number(discountHead) + Number(item.discount)
      //   setHeadData((state) => ({ ...state, discount: Number(state.discount) + Number(item.discount) }))
      //   console.log("GDocCheckProducts.js/discountRecalc/item1=", item)
      //   console.log("GDocCheckProducts.js/discountRecalc/headData=", headData)
    })
    setHeadData((state) => ({ ...state, discount: discountHead }))
    // console.log("GDocCheckProducts.js/discountRecalc/rows1=", rows1)

    setRowData(rows1) //Обновлює масив рядків agGrid
    redrawAllRows() //Перемальовує рядки agGrid
  }

  // ******************************************************************
  //--- Загрузка даних на фронтенді useSWR // refreshInterval: 0,
    console.log("GDocCheckProducts.js/useSWR/headData.id=", headData.id)
  const { data, error } = useSWR(`${urlAPI}${headData.id}`, fetcher, {
  })

  if (error) return <div>не вдалося завантажити</div>
  if (!data) return <p>Loading/Завантаження ...</p>
  // ******************************************************************

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
      <DocHead />
      <AgGrid
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        //
        titleTable={titleTable}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onCancel={onCancel}
        // onRefresh={onRefresh}//Нема зато є //redrawAllRows
        onPrint={onPrint}
        // onChoose={onChoose} // Для входу в документ при подвійному кліку
        onPaymentDialog={onPaymentDialog} //Діалог оплати
        onClient={onClient} //Діалог вибору клієнта
        //
        setSelectedRowState={setSelectedRowState} //Дані з вибраних рядків
      />
      {formActive && <DocCheckProductsForm onCloseForm={onCloseForm} toFormData={toFormData} />}
    </div>
  )
}
