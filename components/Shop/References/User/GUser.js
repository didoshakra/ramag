//GUser.js //Основа- Довідник/НеДовідник\getServerSideProps(context)/useSWR/agGrid\...Form
import useSWR from "swr" //https://www.setup.pp.ua/2020/06/useswr-react.html
// import User from "../../../components/Shop//References/User"
//- обновлення SWR-(mutate)
//********************************************************** */
import { useMemo, useState } from "react"
import { useRouter } from "next/router"
import UserForm from "./UserForm"
import AgGrid from "../../../AgGridModules/AgGrid"
//
const fetcher = (url) => fetch(url).then((r) => r.json()) // Для загрузка даних на фронтенді

export default function GUser({ serverData, isDovidnuk, setDovActive, setValue }) {
  const titleTable = "Користувачі" //заголовок
  const [selectedRowState, setSelectedRowState] = useState({}) //Виділений рядок
  const [formActive, setFormActive] = useState(false) //Для відкриття/закриття форми
  const router = useRouter() //для переходу на сторінки
  //   const [rowData, setRowData] = useState()
  const [toFormData, setToFormData] = useState({}) //Початкове значення для форми
  const [isAdd, setIsAdd] = useState(false) //Щоб знати для чого заходилось у форму(добавл чи кориг)

  //*** параметри і ф-ції AG_Grid **************************************** */
   const columnDefs = useMemo(
     () => [
       //   const [columnDefs, setColumnDefs] = useState([
       {
         //   headerName: "#",
         //   field: "id",
         minWidth: 30,
         maxWidth: 100,
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
       { field: "name", headerName: "Ім'я", width: 300, minWidth: 150, flex: 4 },
       { field: "last_name", headerName: "Прізвище", width: 300, minWidth: 150, flex: 4 },
       { field: "login", headerName: "Логін", minWidth: 90, flex: 1 },
       { field: "password", headerName: "Пароль", minWidth: 90, flex: 1 },
       { field: "profile", headerName: "Профіль", minWidth: 90, flex: 1 },
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

  //=== Add/Edit/Delete/Cancel ================================================================= */
  //--- Добавалення запису (кнопка) ----------------------------------------------*/
  const onAdd = () => {
    setIsAdd(true) //Для форми(добавлення чи коригування)
    setToFormData(null) //Пусті дані в форму
    setFormActive(true) //Відкриваємо форму для занесення інфи
  }
  //--- Добавалення(create) запису(запит)
  const rowAdd = async (formData) => {
    // console.log("User.js/rowAdd/JSON.stringify(formData)=", JSON.stringify(formData))
    const url = "/api/shop/references/d_user/insert" //працює
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
      const data = await mutate() //Обновлення даних
      //   setRowData(data)
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Запис не добавлено! ${err.message} / ${err.stack}`)
      //   console.log(`User.js/rowAdd/try/else/ ${err.message} / ${err.stack} `)
    }
  }

  //--- Коригування записів(кнопка) ------------------------------------------------------- */
  const onEdit = () => {
    // if (countSelectedRows > 0) {
    if (selectedRowState.length > 0) {
      const selectRow = selectedRowState["0"] //Значення всіх полів 0-го виділеного рядка
      //   const agGridId = gridRef.current.api.getFirstDisplayedRow() // індекс першого відображеного рядка
      //   const agGridId = gridRef.current.api.getLastDisplayedRow() // індекс останнього відображеного рядка
      // gridRef.current.api.ensureIndexVisible(16,'top') //прокручує сітку, поки наданий індекс рядка не опиниться всередині видимого вікна перегляд
      //   const rowNode = gridRef.current.api.getRowNode("22") // отримати вузол рядка з ідентифікатором 55
      //   const rowNode1 = gridRef.current.api.getDisplayedRowAtIndex(22) // отримати вузол рядка з ідентифікатором 55
      //   console.log("User/onEdit/agGridId  = ", agGridId)
      setIsAdd(false) //Для форми(добавлення чи коригування)
      setToFormData(selectRow) //Дані з вибраного запису в форму
      setFormActive(true) //Відкриваємо форму для занесення інфи
      //   console.log("User/onEdit/selectRow  = ", selectRow)
      //****************************************** */
    } else {
      alert("Не вибрано ні одного запису для коригуввання")
    }
  } //--- Коригування запису(запит)
  const rowEdit = async (newRow) => {
    // const agGridId = gridRef.current.api.getFirstDisplayedRow() // індекс першого відображеного рядка
    // console.log("/GUser.js/rowEdit/getFirstDisplayedRow= ", agGridId)
    // gridRef.current.api.ensureIndexVisible(agGridId) //прокручує сітку, поки наданий індекс рядка не опиниться всередині видимого вікна перегляд
    // console.log("/agrid_users-pg/rowEdit//newRow= ", newRow)
    //Запит до сервера БД
    const url = "/api/shop/references/d_user/edit" //вибрати все-працює
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
      const data = await mutate() //Обновлення даних
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Помилка зміни записів! ${err.message} / ${err.stack}`)
      // console.log(`+++psql-...-fetch.js/UPDATE/ ${err.message} / ${err.stack} `);
    }
  }

  //--- Вилучення записів(кнопка) -------------------------------------------------------*/
  const onDelete = () => {
    // if (countSelectedRows > 0) {
    if (selectedRowState.length > 0) {
      const selRowsID = selectedRowState.map((item) => +item.id) // Створюємо(+) масив id-рядків для вилучення /
      //   console.log("User/onDelete/selRowsID  = ", selRowsID)
      rowsDelete(selRowsID)
    }
  }
  //--- Вилучення записів(запит)
  const rowsDelete = async (rows) => {
    // console.log("+++++f2-flex-table-psql.js/App/onDelete/rowDelete/rows=", rows);
    const url = "/api/shop/references/d_user/delete" //працює
    const options = {
      method: "DELETE",
      body: JSON.stringify(rows), //Для запитів до серверів використовувати формат JSON
      //headers: { //не треба header
    }
    const response = await fetch(url, options)
    if (response.ok) {
      // якщо HTTP-статус в диапазоне 200-299
      const resDelete = await response.json() //повертає тіло відповіді json
      const data = await mutate() //Обновлення даних
      alert(`Вилучено ${resDelete} записів`)
      // console.log(`psql-...-fetch.js/Вилучено ${resDelete} записів`);
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Помилка вилучення записів! ${err.message} / ${err.stack}`)
      // console.log(`+++psql-...-fetch.js/DELETE/ ${err.message} / ${err.stack} `);
    }
  }

  //= Оновити дані
  const onRefresh = () => {
    // console.log("User.js/onRefresh")
    alert("onRefresh")
    mutate() //Обновлення даних SWR
    // setRowData(data) //з сервера Pg
    // gridRef.current.api.ensureIndexVisible(16, "top") //прокручує сітку/рядок(RowID) всередину початок вікна
    // gridRef.current.api.ensureIndexVisible(agGridId, "top") //прокручує сітку/рядок(RowID) початок вікна
    // gridRef.current.api.ensureIndexVisible(selectedRowGridID, "top") //прокручує сітку/рядок(RowID) всередину видимого вікна
  }

  //= Закриття форми вводу даних (UsersForm)
  const onCloseForm = (formData) => {
    setFormActive(false)
    //Якщо є дані з форми
    if (formData) {
      if (isAdd) rowAdd(formData)
      else {
        rowEdit(formData) //Виклик ф-ції запису в БД
        // onFirstDataRendered()
      }
    }
  }

  //Вибрати(Choose) значення з довідника і передати в input форми
  const onChoose = () => {
    // alert(onChoose)
    // console.log("User.js/onChoose/SelectedRowState=", selectedRowState["0"])
    if (isDovidnuk) setDovActive("")
    setValue("brand_id", selectedRowState["0"].id)
    setValue("brand", selectedRowState["0"].name)
    // Router.back()//На попередню сторінку
  }

  //--- На друк
  const onPrint = () => {
    alert("onPrint")
  }

  //= Вихід з форми
  const onCancel = () => {
    //якщо не довідник
    if (!isDovidnuk) router.push("/") //перехід на сторінку
    // if (!isDovidnuk) router.back() //повернутись
    else setDovActive("")
  }

  //= Загрузка даних на фронтенді useSWR == {refreshInterval: 0, //milliseconds}=========*/
  const { data, mutate, error } = useSWR("/api/shop/references/d_user/select-all", fetcher)
  if (error) return <div>не вдалося завантажити</div>
  if (!data) return <p>Loading/Завантаження ...</p>
  //**================================================================================== */

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <AgGrid
        isDovidnuk={isDovidnuk} //Чи довідник (для інтерфейсу)
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        //
        titleTable={titleTable}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        onCancel={onCancel}
        onRefresh={onRefresh}
        onPrint={onPrint}
        onChoose={onChoose} //Вибрати дані з довідника
        //
        setSelectedRowState={setSelectedRowState} //Дані з вибраних рядків
      ></AgGrid>
      {formActive && <UserForm onCloseForm={onCloseForm} toFormData={toFormData} />}
    </div>
  )
}
