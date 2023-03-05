//d_doc_check_head.js //Основа- Довідник/НеДовідник\getServerSideProps(context)/useSWR/agGrid\...Form

import { pool } from "../../../config/dbShop"
import Layout from "../../../components/Main/Layout"
// GDocCheckHead
import useSWR from "swr" //https://www.setup.pp.ua/2020/06/useswr-react.html
import {  useMemo, useState, useCallback, useRef } from "react"
import { useRouter } from "next/router"
import AgGrid from "../../../components/AgGridModules/AgGrid"
import DocCheckProducts from "./doc_check_products"


const urlAPI = "/api/shop/docs/doc_check_head/" // Для useSWR/getServerSideProp i...
const fetcher = (url) => fetch(url).then((res) => res.json()) // Для useSWR
const par = { p1: 1, p2: 1 } //Параметри до select /Департаммент,каса

export default function DocCheckHead({ serverData }) {
    console.log("d_doc_check_head.js")
  const workPlace = { departament_id: 1, place: 1, user_id: 1 } //Параметри робочого місця(користувача)
  const titleTable = "Товарні чеки" //заголовок
  //
  const router = useRouter() //для переходу на сторінки
  const gridRef = useRef(0)
  const [rowData, setRowData] = useState()
  //   const [countSelectedRows, setCountSelectedRows] = useState(0) //к-сть виділених рядків
  const [selectedRowState, setSelectedRowState] = useState({}) //виділені рядки(вміст)
  //
  const [isAdd, setIsAdd] = useState(false) //Щоб знати для чого заходилось у форму(добавл чи кориг)
  const [docContent, setDocContent] = useState("") //Для показу вмісту документу(різні варіанти для довідників)
  //Початкове значення вибраного рядка для форми і док
  const [headData, setHeadData] = useState({
    newDoc: false, //Якщо документ добавляється
    id: 1, //doc_check_head.id = doc_check_products.check_id
    total: 0,
    discount_proc: 0,
    discount: 0, //Знижка в гривнях
    departament_id: workPlace.departament_id,
    place: workPlace.place,
    user_id: workPlace.user_id,
    user: "",
    client_id: 1, //Клієнт по замовчуванню
    client: "",
  })

  //*** параметри і ф-ції AG_Grid
  const columnDefs = useMemo(
    () => [
      //   const [columnDefs, setColumnDefs] = useState([
      {
        minWidth: 30,
        maxWidth: 50,
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
      { field: "id", headerName: "№чека" },
      { field: "total", headerName: "Сума(грн)", type: "numericColumn", minWidth: 120, flex: 2 },
      { field: "discount", headerName: "Знижка(грн)", type: "rightAligned", minWidth: 140, flex: 2 },

      // { field: "number", headerName: "№ чека" },
      { field: "departament_id", hide: true }, //Прихований(hide) рядок
      { field: "departament", headerName: "Підрозділ" },
      { field: "place", headerName: "Каса" },
      { field: "user_id", hide: true }, //Прихований(hide) рядок
      { field: "user", headerName: "Касир" },
      { field: "client_id", hide: true }, //Прихований(hide) рядок
      { field: "client", headerName: "Клієнт", minWidth: 200, flex: 3 },
      { field: "datetime", headerName: "Час створення", minWidth: 180 },
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

  //= Оновити дані
  const onRefresh = () => {
    // console.log("Brand.js/onRefresh")
    // alert("onRefresh")
    // mutate("/api/shop/references/d_brand/select-all", true) //Обновлення даних SWR
  }

  //--- Вихід з форми
  const onCancel = () => {
    router.push("/") //перехід на сторінку
  }
  //** k agGrid  **********************************************************************/

  //=== Add/Edit/Delete/Cancel
  // Добавалення запису (кнопка)
  const onAdd = () => {
    // selSequence() // Отримати код з послідовності// SELECT nextval('doc_check_products_id_seq')

    //+++ Зміна конкретного ключа об'єкта useState //https://qna.habr.com/q/1152478
    setHeadData((state) => ({ ...state, newDoc: true }))
    setHeadData((state) => ({ ...state, departament_id: workPlace.departament_id }))
    setHeadData((state) => ({ ...state, place: workPlace.place }))
    setHeadData((state) => ({ ...state, user_id: workPlace.user_id }))
    setHeadData((state) => ({ ...state, id: 0 })) //doc_check_head.id=doc_check_products.check_id
    setHeadData((state) => ({ ...state, total: 0 }))
    setHeadData((state) => ({ ...state, discount: 0 }))
    setHeadData((state) => ({ ...state, discount_proc: 0 }))

    setDocContent("DocCheckProducts") //Відкриття заданого ("GDocCheckProducts") компонента
  }

  //   //--- Коригування записів(кнопка)
  const onEdit = () => {
    onDoubleClicke()
    //     if (countSelectedRows > 0) {
    //       const selectRow = selectedRowState["0"] //Значення всіх полів 0-го виділеного рядка
    //       setIsAdd(false) //Для форми(добавлення чи коригування)
    //       setHeadData(selectRow) //Дані з вибраного запису в форму
    //       // rowEdit(headData)// переніс в onCloseForm, бо зразу спрацьовувало
    //       //   console.log("/onEdit/selectRow  = ", selectRow)
    //       //*********************d_doc_check_head.js********************* */
    //     } else {
    //       alert("Не вибрано ні одного запису для коригуввання")
    //     }
    //   }
    //   //--- Коригування запису(запит)
    //   const rowEdit = async (newRow) => {
    //     // console.log("/agrid_users-pg/rowEdit//newRow= ", newRow)
    //     //Запит до сервера БД
    //     const url = "/api/shop/docs/doc_check_head/edit" //вибрати все-працює
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
  }

  //   //--- Вилучення записів(кнопка)
  const onDelete = () => {
    if (countSelectedRows > 0) {
      const selRowsID = selectedRowState.map((item) => +item.id) // Створюємо(+) масив id-рядків для вилучення /
      //   console.log("d_doc_check_head.js/onDelete/selRowsID  = ", selRowsID)
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

  //--- Перехіл у вибраний (onChoose) документ
  const onChoose = () => {
    alert("onChoose")
    setHeadData(selectedRowState["0"]) //Дані з вибраного запису в форму(для select)
    setDocContent("DocCheckProducts") //Для відкриття забаного ("DocCheckProducts") компонента
    console.log("d_doc_check_head.js/onChoose/selectedRowState0  = ", selectedRowState["0"])
  }

  //--- ExportExell // Пацює при включеній опції "ag-grid-enterprise"
  const onExportExcel = useCallback(() => {
    alert("onExportExcel")
    gridRef.current.api.exportDataAsExcel()
  }, [])

  //--- На друк   // Ще не працює
  const onPrint = () => {
    alert("onPrint")
  }

  //--- Загрузка даних на фронтенді useSWR
  const { data, error } = useSWR(`${urlAPI}${par.p1}/${par.p2}`, fetcher, {
    refreshInterval: 0,
  })

  if (error) return <div>не вдалося завантажити</div>
  if (!data) return <p>Loading/Завантаження ...</p>
  //----------------------------------------------

  return (
    <Layout>
      <div style={{ height: "100%", width: "100%" }}>
        <AgGrid
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
          onChoose={onChoose} // Для входу в документ при подвійному кліку
          //
          setSelectedRowState={setSelectedRowState} //Дані з вибраних рядків
        />
        {docContent === "DocCheckProducts" && (
          <DocCheckProducts
            setDocContent={setDocContent} //Активація lдокументу
            headData={headData} //Для select( вибору даних по докумуету-у випадку перегляду=docHeadData.id)
            setHeadData={setHeadData}
          />
        )}
      </div>
    </Layout>
  )
}

//= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  let data = {}
  const res = await pool.connect((err, client, done) => {
    const sql = `SELECT doc_check_head.id,place,user_id,client_id,total,discount,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,d_departament.name AS departament,d_user.name AS user,d_client.name AS client FROM doc_check_head JOIN d_departament ON d_departament.id = doc_check_head.departament_id JOIN d_user ON d_user.id = doc_check_head.user_id JOIN d_client ON d_client.id = doc_check_head.client_id WHERE doc_check_head.departament_id = ${par.p1} AND place = ${par.p2}  ORDER BY id DESC`
    if (err) throw err //видає опис помилки підключення
    data = client.query(sql, (err, result) => {
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

