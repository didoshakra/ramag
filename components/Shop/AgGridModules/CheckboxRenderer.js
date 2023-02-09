//Для agGrid
export default function CheckBoxRenderer(props) {
  const checkedHandler=(e)=> {
    let checked = e.target.checked
    let colId = props.column.colId
    props.node.setDataValue(colId, checked)}
  return <input type="checkbox" onChange={(e) => checkedHandler} checked={props.value} />
}

