//d_doc_check_head.js //Основа- Довідник/НеДовідник\getServerSideProps(context)/useSWR/agGrid\...Form
//Шпаки документів з входом у документ(додавання/кор... з самого документа)

import Layout from "../../../components/Main/Layout"
//*** Для agGrid **** */ */
import { dbHost } from "../../../config/dbHost"
import useSWR from "swr" //https://www.setup.pp.ua/2020/06/useswr-react.html
import { useContext, useMemo, useState, useCallback, useRef } from "react"
import { useRouter } from "next/router"
import { AgGridReact } from "ag-grid-react"
import { ComponentContext } from "../../../context/ComponentContext"
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
import IconTable_c2 from "../../../components/ui/svg/table/IconTable_c2"
import IconExport from "../../../components/ui/svg/table/IconExport"
import IconPrinter_c2 from "../../../components/ui/svg/head/IconPrinter_c2" //Принтер
import DocCheckProducts from "./doc_check_products"

//******************************************************************************* */
//
const urlAPI = "/api/shop/docs/doc_check_head/" // Для useSWR/getServerSideProp i...
const fetcher = (url) => fetch(url).then((res) => res.json()) // Для useSWR
const par = { p1: 1, p2: 1 } //Параметри до select /Департаммент,каса

export default function DocCheckHead({ serverData }) {
  //--- Загрузка даних на фронтенді useSWR
  const { data, error } = useSWR(`${urlAPI}${par.p1}/${par.p2}`, fetcher, {
    initialData: serverData,
  })

  if (error) return <div>не вдалося завантажити</div>
  if (!data) return <p>Loading/Завантаження ...</p>
  //---

  return (
    <Layout>
      {/* <div style={{ position: "relative", width: "calc(100vw-300px)", height: "calc(100vh - 100px)" }}> */}
      <div style={{ position: "absolute", width: "calc(100vw)", height: "calc(100vh - 100px)" }}>
        <GDocCheckHead data={data} />
      </div>
    </Layout>
  )
}

//= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  //onst response = await fetch("http://localhost:3000/api/shop/docs/doc_check_head/")
  const url = `${dbHost}${urlAPI}${par.p1}/${par.p2}` //->/[...slug].js
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

function GDocCheckHead({ data }) {
  const workPlace = { departament_id: 1, place: 1, user_id: 1 } //Параметри робочого місця(користувача)
  const titleTable = "Товарні чеки" //заголовок
  //
  const { state, dispatch } = useContext(ComponentContext)
  const { theme, themeTypeLight } = state
  const router = useRouter() //для переходу на сторінки
  const gridRef = useRef(0)
  const [gridApi, setGridApi] = useState(null)
  const [rowData, setRowData] = useState()
  const [autoPageSize, setAutoPageSize] = useState(false)
  const [countSelectedRows, setCountSelectedRows] = useState(0) //к-сть виділених рядків
  const [selectedRowState, setSelectedRowState] = useState({}) //виділені рядки(вміст)
  //
  const [isAdd, setIsAdd] = useState(false) //Щоб знати для чого заходилось у форму(добавл чи кориг)
  const [docContent, setDocContent] = useState("") //Для показу вмісту документу(різні варіанти для довідників)
  //Початкове значення вибраного рядка для форми і док
  const [headData, setHeadData] = useState({
    newDoc: false, //Якщо документ добавляється
    id: 0, //doc_check_head.id = doc_check_products.check_id
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
  const columnDefs = useMemo(() => [
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

  //--- загрузка даних в Agrid
  const onGridReady = (params) => {
    if (gridApi) {
      //Якщо включено sizeColumnsToFit, то не працює параметр flex:1/flex:2...
      gridApi.sizeColumnsToFit() //Розмір стовпців відповідно до встановленого розміру(width).Якщо width не встановлено то воно береться з defaultColDef
    }
    setGridApi(params.api)
    setRowData(data) //з сервера Pg
  }

  const onSelectionChanged = (params) => {
    setCountSelectedRows(params.api.getSelectedRows().length) //к-сть вибраних рядків
    setSelectedRowState(params.api.getSelectedRows()) //вибрані рядки(iнформація)
    // console.log("doc_check_head.js/SelectionChanged/К-сть вибраних рядків=", countSelectedRows)
    // console.log("doc_check_head.js/SelectedRowState=", selectedRowState)
  }

  //--- Обновити дані
  const refreshState = () => {
    setRowData(data) //з сервера Pg
  }
  //--- відновити початковий стан стовбців //https://www.ag-grid.com/archive/27.2.0/react-data-grid/column-state/
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

  //--- Вибір(змінити) к-сті рядків на сторінці //https://www.ag-grid.com/archive/26.0.0/react-data-grid/row-pagination/
  const onPageSizeChanged = useCallback(() => {
    setAutoPageSize(false)
    var value = document.getElementById("page-size").value
    if (value == "0") setAutoPageSize(true)
    gridRef.current.api.paginationSetPageSize(Number(value))
  }, [])

  //--- Вихід з форми
  const onCancel = () => {
    router.push("/") //перехід на сторінку
  }

  //=== Add/Edit/Delete/Cancel
  // Добавалення запису (кнопка)
  const onAdd = () => {
    // selSequence() // Отримати код з послідовності// SELECT nextval('doc_check_products_id_seq')
    //+++ Зміна конкретного ключа об'єкта useState //https://qna.habr.com/q/1152478
    setHeadData((state) => ({ ...state, newDoc: true }))
    setHeadData((state) => ({ ...state, departament_id: workPlace.departament_id }))
    setHeadData((state) => ({ ...state, place: workPlace.place }))
    setHeadData((state) => ({ ...state, user_id: workPlace.user_id }))
    setHeadData((state) => ({ ...state, total: 0 }))
    setHeadData((state) => ({ ...state, discount: 0 }))
    setHeadData((state) => ({ ...state, discount_proc: 0 }))

    setDocContent("DocCheckProducts") //Для відкриття забаного ("DocCheckProducts") компонента
  }

  // Вибір з БД// Отримати код з послідовності// SELECT nextval('doc_check_products_id_seq')
  const selSequence = async () => {
    // console.log("doc_check_head.js/selSequence/values=")
    const url = `/api/shop/docs/doc_check_head/select-seqence/` //!!Має бути doc_check_products
    const response = await fetch(url)
    if (response.ok) {
      const resRow = await response.json() //повертає тіло відповіді json
      //   console.log("doc_check_head.js/selParam/resRow=", resRow[0].nextval)
      if (resRow.length > 0) {
        //--- Обновлення значення полів масиву об'єктів
        setHeadData((state) => ({ ...state, id: resRow[0].nextval }))
      } else {
        setHeadData((state) => ({ ...state, id: 0 }))
      }
      //   document.querySelector("#enter")?.focus() //Передати фокус в Отримано від покупця
    } else {
      const err = await response.json() //повертає тіло відповіді json
      console.log(`Product.js/rowAdd/try/else/\ запиту\ ${err.message} / ${err.stack} `)
    }
  }

  //--- Добавалення(create) запису(запит)
  const rowAdd = async (headData) => {
    // console.log("doc_check_head.js/rowAdd/headData=", headData)
    // console.log("doc_check_head.js/rowAdd/JSON.stringify(headData)=", JSON.stringify(headData))
    const url = "/api/shop/docs/doc_check_head/insert" //працює
    const options = {
      method: "POST",
      body: JSON.stringify(headData), //Для запитів до серверів використовувати формат JSON
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

  //   //--- Коригування записів(кнопка)
  const onEdit = () => {
    //     if (countSelectedRows > 0) {
    //       const selectRow = selectedRowState["0"] //Значення всіх полів 0-го виділеного рядка
    //       setIsAdd(false) //Для форми(добавлення чи коригування)
    //       setHeadData(selectRow) //Дані з вибраного запису в форму
    //       // rowEdit(headData)// переніс в onCloseForm, бо зразу спрацьовувало
    //       //   console.log("GDocCheckHead/onEdit/selectRow  = ", selectRow)
    //       //****************************************** */
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
    //     if (countSelectedRows > 0) {
    //       const selRowsID = selectedRowState.map((item) => +item.id) // Створюємо(+) масив id-рядків для вилучення /
    //       //   console.log("GDocCheckHead/onDelete/selRowsID  = ", selRowsID)
    //       rowsDelete(selRowsID)
    //     }
    //   }
    //   //--- Вилучення записів(запит)
    //   const rowsDelete = async (rows) => {
    //     // console.log("+++++f2-flex-table-psql.js/App/onDelete/rowDelete/rows=", rows);
    //     const url = "/api/shop/docs/doc_check_head/delete" //працює
    //     const options = {
    //       method: "DELETE",
    //       body: JSON.stringify(rows), //Для запитів до серверів використовувати формат JSON
    //       //headers: { //не треба header
    //     }
    //     const response = await fetch(url, options)
    //     if (response.ok) {
    //       // якщо HTTP-статус в диапазоне 200-299
    //       const resDelete = await response.json() //повертає тіло відповіді json
    //       alert(`Вилучено ${resDelete} записів`)
    //       // console.log(`psql-...-fetch.js/Вилучено ${resDelete} записів`);
    //     } else {
    //       const err = await response.json() //повертає тіло відповіді json
    //       alert(`Помилка вилучення записів! ${err.message} / ${err.stack}`)
    //       // console.log(`+++psql-...-fetch.js/DELETE/ ${err.message} / ${err.stack} `);
    //   }
  }

  //--- При двойному кліку по рядку вибрати значення з довідника і передати в input форми
  const onDoubleClicke = () => {
    setHeadData(selectedRowState["0"]) //Дані з вибраного запису в форму(для select)
    // setDocContent("DocCheckProducts") //Для відкриття забаного ("DocCheckProducts") компонента
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

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="agrid_head-container">
        <div className="agrid_head-container-left">
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
            <button className="agrid_head-nav-button" onClick={onAdd} title="Добавити">
              <IconAdd width="15" height="15" colorFill={theme.colors.tableIcon} />
            </button>
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
                  colorFill1={theme.colors.tableIcon}
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
          {/* )} */}
        </div>
        {/*  */}
        <div className="agrid_head-title">{titleTable}</div>
        {/* <div>Імпортовано: {insertRows.current} зап.</div> */}
        {/*  */}
        <div className="agrid_head-container-right">
          <div className="agrid_head-container-right-notmobi">
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
                <IconExport width="15" height="15" colorFill={theme.colors.tableIcon} />
              </button>
            </div>
          </div>
          <button className="agrid_head-nav-button" onClick={onCancel} title="Вийти">
            <IconCancel width="15" height="18" colorFill={theme.colors.tableIcon} />
          </button>
        </div>
      </div>
      <div className="agrid_head-title-mobi">
        <p>{titleTable}</p>
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
          rowSelection="multiple" //дозволяє вибирати рядки клацанням миші
          // onRowSelected={onRowSelected} //Для вибору даних використовую ф-цію selectedRowState
          onSelectionChanged={onSelectionChanged} //Вибір клацанням на рядок
          onRowDoubleClicked={onDoubleClicke} //Подвійний клік на рядку
        ></AgGridReact>
      </div>
      {docContent === "DocCheckProducts" && (
        <DocCheckProducts
          setDocContent={setDocContent} //Активація lдокументу
          headData={headData} //Для select( вибору даних по докумуету-у випадку перегляду=docHeadData.id)
          setHeadData={setHeadData}
        />
      )}
      {/* --- */}
      <style jsx>{`
        .agrid_head-container-right-notmobi,
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
        .agrid_head-container-right-notmobi {
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
          .agrid_head-container-right-notmobi {
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
