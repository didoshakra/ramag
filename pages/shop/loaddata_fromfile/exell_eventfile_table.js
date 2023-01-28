//22.07.2022/Як імпортувати Excel у Next JS
//https://medium.com/@aalam-info-solutions-llp/excel-import-in-next-js-50359f3d7f66

import { useState } from "react"
import * as XLSX from "xlsx"

export default function ExellEventFileTable() {
  //   console.log("exell_eventfile_table.js")
  const [dataJson, setDataJson] = useState([]) // для convertToJson
  const [tableHead, setTableHead] = useState([]) //papa-Таблиці Назва стовпця
  const [tableRows, setTableRows] = useState([]) //papa-Збереження значень
  const [insertZap, setInsetrZap] = useState(0) //papa-Збереження значень

  //Функція для перетворення даних файлу Excel у формат JSON
  const convertToJson = async (headers, data) => {
    // console.log("exell_e.ventfile_table.js/convertToJson/headers=", headers)
    // console.log("exell_eventfile_table.js/convertToJson/data=", data)
    // debugger
    const rows = []
    //forEach-цикл
    data.forEach(async (row) => {
      let rowData = {}
      row.forEach(async (element, index) => {
        rowData[headers[index]] = element
      })
        console.log("exell_eventfile_table.js/convertToJson/ElementrowData=", rowData)
      rows.push(rowData)
    })
    setDataJson(rows)
    console.log("exell_eventfile_table.js/convertToJson/rows=", rows)
    // console.log("exell_eventfile_table.js/convertToJson/dataJson=", dataJson)
    return rows
  }

  const handleImportExell = (e) => {
    const file = e.target.files[0] //для читання файлу.
    const reader = new FileReader()
    reader.onload = (event) => {
      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" }) //читання файлу excel
      const workSheetNane = workBook.SheetNames[0] //читання назви аркуша.
      const workSheet = workBook.Sheets[workSheetNane]
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 }) //читання даних файлу.
      const headers = fileData[0] //читання першого рядка як заголовка
      //   const heads = headers.map((head) => ({ tittle: head, field: head }))
      fileData.splice(0, 1)

      convertToJson(headers, fileData) // в формат Json

      setTableHead(headers) //papa/Відфільтровані назви стовпців
      setTableRows(fileData) //papa//Відфільтровані значення
      //   console.log("exell_eventfile_table.js/importExell/headers=", headers)
        console.log("exell_eventfile_table.js/importExell/fileData=", fileData)
    }
    // console.log("exell_eventfile_table.js/importExell/dataJson=", dataJson)

    reader.readAsBinaryString(file)
  }

  //   console.log("exell_eventfile_table.js/importExell/tableHead=", tableHead)
  //   console.log("exell_eventfile_table.js/importExell/tableRows=", tableRows)

  //****************************************************** */
  const rowAdd = async (formData) => {
    console.log("exell_eventfile_table.js/rowAdd/insertZap=", insertZap)
    // console.log("exell_eventfile_table.js/rowAdd/formData=", formData)
    const url = "/api/shop/references/d_product/insert" //працює
    const options = {
      method: "POST",
      body: JSON.stringify(formData), //Для запитів до серверів використовувати формат JSON
      headers: {
        "Content-Type": "application/json", //Вказує на тип контенту
      },
    }

    const response = await fetch(url, options)//Запит до API

    if (response.ok) {
      console.log("exell_eventfile_table.js/rowAdd/response/insertZap=", insertZap)
      // якщо HTTP-статус в диапазонi 200-299
      const resRow = await response.json() //тіло відповіді json
      //   alert(`Запис успішно добавленo ${resRow}`)
        console.log(`exell_eventfile_table.js/rowAdd/response/${resRow} `)
        // setInsetrZap(insetrZap + 1)
    } else {
      const err = await response.json() //тіло відповіді json
      //   alert(`Запис не добавлено! ${err.message} / ${err.stack}`)
        console.log(`exell_eventfile_table.js/rowAdd/try/else/ ${err.message} / ${err.stack} `)
    }
  }

  const handleToPostgreSQL = () => {
    // console.log("exell_eventfile_table.js/handleToPostgreSQL/tableRows=", tableRows)
    console.log("exell_eventfile_table.js/handleToPostgreSQL/dataJson=", dataJson[0])
    // try {
    //   dataJson.forEach((row) => {
    //     //   console.log("exell_eventfile_table.js/handleToPostgreSQL/row=", row)
    //     rowAdd(row)
    //   })
    // } finally {
    //   //   alert("finally/Добавленo записів:", insertZap)
    //   //   done()
    // }
  }
  //****************************** */
  //***************************************************************** */
  return (
    <div style={{ position: "relative", margin: "5px", width: "calc(100vw - 20px)", height: "calc(100vh - 150px)" }}>
      <h2 style={{ color: "red", textAlign: "center" }}>22.07.2022-Як імпортувати Excel у Next JS</h2>
      <h3 style={{ color: "green", textAlign: "center" }}>
        exell_eventfile_table.js *** //https://medium.com/@aalam-info-solutions-llp/excel-import-in-next-js-50359f3d7f66
      </h3>
      {/* File Uploader */}
      <div style={{ display: "flex" }}>
        <input
          type="file"
          name="file"
          onChange={handleImportExell}
          accept=".xlsx"
          style={{ display: "block", margin: "10px auto" }}
        />
        <button style={{ display: "block", margin: "10px auto" }} onClick={handleToPostgreSQL}>
          Завантажити в PostgresSql
        </button>
      </div>
      <br />
      <br />
      {/* Table */}
      {/* <table style={{maxHeight: "100%",maxWidth: "100%", border: "2px solid grey" }}> */}
      <table style={{ maxHeight: "100%", maxWidth: "800px", border: "2px solid grey" }}>
        <thead style={{ color: "blue", border: "2px solid grey" }}>
          <tr style={{ wmaxWidth: "100%" }}>
            {tableHead.map((rows, index) => {
              return <th key={index}>{rows}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((value, index) => {
            return (
              <tr key={index} style={{ wmaxWidth: "100%" }}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
