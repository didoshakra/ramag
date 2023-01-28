//11/03/2022//Як аналізувати або читати файли CSV у ReactJS
//https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
// import "./App.css"
import { useState } from "react"
import Papa from "papaparse"

export default function CsvPapaparse() {
  /// State to store parsed data
  const [parsedData, setParsedData] = useState([])

  //State to store table Column name/Стан для зберігання таблиці Назва стовпця
  const [tableRows, setTableRows] = useState([])

  //State to store the values/Стан для збереження значень
  const [values, setValues] = useState([])

  const changeHandler = (event) => {
    // // read csv file and get buffer
    // const buffer = fs.readFileSync("input.csv")

    // // parse buffer to string with encoding
    // let dataString = iconv.decode(buffer, "win1251")

    // Passing file data (event.target.files[0]) to parse using Papa.parse
    //Передача даних файлу (event.target.files[0]) для аналізу за допомогою Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      format: "UTF-8",
      //   encoding: "win1251",
      decode: "win1251",
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = []
        const valuesArray = []

        // Iterating data to get column name and their values
        //Ітерація даних для отримання імені стовпця та його значень
        results.data.map((d) => {
          rowsArray.push(Object.keys(d))
          valuesArray.push(Object.values(d))
        })
   console.log("csv_papaparse.js/changeHandler/rowsArray[0]=", rowsArray[0])
   console.log("csv_papaparse.js/changeHandler/valuesArray=", valuesArray)

        // Parsed Data Response in array format
        //Відповідь проаналізованих даних у форматі масиву
        setParsedData(results.data)

        // Filtered Column Names/Відфільтровані назви стовпців
        setTableRows(rowsArray[0])

        // Filtered Values/Відфільтровані значення
        setValues(valuesArray)
        // setValues(rowsArray)
      },
    })
  }
  console.log("csv_papaparse.js/values=", values)
  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ color: "red", textAlign: "center" }}>11/03/2022-Як аналізувати або читати файли CSV у ReactJS</h2>
      <h3 style={{ color: "green", textAlign: "center" }}>
        //https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
      </h3>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
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
