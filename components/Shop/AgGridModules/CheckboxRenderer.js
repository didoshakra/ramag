import {useState} from 'react'

export default function CheckBoxRenderer(props) {
//   const [checkedHandler, setCheckedHandler] = useState()

  const checkedHandler=(e)=> {
    let checked = e.target.checked
    let colId = props.column.colId
    props.node.setDataValue(colId, checked)}
  return (
    <input type="checkbox" onClick={(e)=>checkedHandler} checked={props.value} />
  )
}

