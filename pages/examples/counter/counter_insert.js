//counterInsert-лічильник циклів(для лічильника додавання записів в БД)
import { useEffect, useState, useRef } from "react"

export default function counterInsert() {
  const insertRowsRef = useRef(0) //number of inserted records
  const isInsertRowsRef = useRef(true) //number of inserted records
  const [insertRows, setInsertRows] = useState(0) //number of inserted records
  const [isInsert, setIsInsert] = useState(true) //Кінець циклу// Visual ProgressBar

  const data = [
    { id: 1, name: "Roman" },
    { id: 2, name: "Misha" },
    { id: 3, name: "Vova" },
  ]

  const addRows = (data) => {
    // try {
    data.forEach((row) => {
      // const cInsert = insertToPSQL(row) //Insert record to PostgreSQL (async function)
      insertRowsRef.current = insertRowsRef.current + 1
      setInsertRows(insertRows + 1)
      console.log("insertRows=", insertRows)
      // setInsertRows((prev) => prev + 1)
      console.log("insertRowsRef.current=", insertRowsRef.current)
      // console.log("insertRows=", insertRows)
    })
    alert(`finally:Added ${insertRowsRef.current}`)
    isInsertRowsRef.current = isInsertRowsRef.current = false
    insertRowsRef.current = insertRowsRef.current = 0
    setIsInsert(false)
    console.log("insertRows=", insertRows)

    // } finally {
    //   console.log("insertRowsRef.current=", insertRowsRef.current)
    //   alert(`finally:Added ${insertRowsRef.current}`)
    //   insertRowsRef.current = 0
    //   setInsertRows(0)
    // }
  }

  const handleInsert = () => {
    // setIsInsert(true)
    addRows(data)
  }

  //The problem is solved. Added the code
  useEffect(() => {
    if (isInsertRowsRef.current) addRows(data)
  }, [data])

  return (
    <div style={{ textAlign: "center", color: "blue" }}>
      <h2 style={{ color: "red" }}>counterInsert</h2>
      <button onClick={handleInsert} style={{ color: "yellow", backgroundColor: "blue" }}>
        Insert
      </button>
      {/* {<div>Added records:{insertRowsRef.current} </div>} */}
      {<div>Added records:{insertRows} </div>}
    </div>
  )
}
