//29/08/2020//Import CSV data into PostgreSQL using Node.js
//https://www.bezkoder.com/node-js-csv-postgresql/
import path from "path"
import fs from "fs"
const fastcsv = require("fast-csv")

// export default function CsvFastcsv(props) {
export default function CsvFastcsvGetStatProps() {
  const filePath = path.join(process.cwd(), "data/bezkoder.csv")
  let stream = fs.createReadStream(filePath)
  let csvData = []
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data)
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift()

      // connect to the PostgreSQL database
      // save csvData
    })

  stream.pipe(csvStream)
  console.log("csv_fastcsv.js/csvData=", csvData)

  // const posts = props.posts
  //   console.log("csv_fastcsv.js/props=", props)
  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ color: "red", textAlign: "center" }}>11/03/2022-Як аналізувати або читати файли CSV у ReactJS</h2>
      <h3 style={{ color: "green", textAlign: "center" }}>
        //https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0
      </h3>
      {/* Table */}
      {/* <table>
        <thead>
          <tr>
            {pr.map((rows, index) => {
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
      </table> */}
    </div>
  )
}

// // Fetching data from the JSON file
// import path from "path"
// import fs from "fs"
// const fastcsv = require("fast-csv")

// export async function getStaticProps() {
//   const filePath = path.join(process.cwd(), "data/bezkoder.csv")
//   //   let stream = await fs.createReadStream(filePath, "utf8")
// //   let stream = await fs.createReadStream(filePath)
//   const jsonData = await fs.readFile(filePath)
//   const objectData = JSON.parse(jsonData)

//   //   let stream = fs.createReadStream("bezkoder.csv")
//   let csvData = []
//   let csvStream = fastcsv
//     .parse()
//     .on("data", function (data) {
//       csvData.push(data)
//     })
//     .on("end", function () {
//       // remove the first line: header
//       csvData.shift()

//       // connect to the PostgreSQL database
//       // save csvData
//     })
//   stream.pipe(csvStream)
//     console.log("csv_fastcsv.js/getStaticProps/csvData=", csvData)

//   return {
//     props: objectData,
//     // props: csvData,
//   }
// }
