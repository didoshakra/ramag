import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import BootstrapTable from "react-bootstrap-table-next"

const data = [
  { id: 1, name: "Gob", value: "2" },
  { id: 2, name: "Buster", value: "5" },
  { id: 3, name: "George Michael", value: "4" },
]
const columns = [
  {
    dataField: "id",
    text: "Product ID",
    // style: { backgroundColor: #00afb9 },
  },
  {
    dataField: "name",
    text: "Product Name",
    headerStyle: (colum, colIndex) => {
      return { width: "60%", textAlign: "center" }
    },
    sort: true,
  },
  {
    dataField: "value",
    text: "Product value",
    headerStyle: (colum, colIndex) => {
      return { width: "20%", textAlign: "center" }
    },
  },
]

export default function RbTabletBasic() {
    const CaptionElement = () => (
      <h3
        style={{
          borderRadius: "0.25em",
          textAlign: "center",
          color: "purple",
          border: "1px solid purple",
          padding: "0.5em",
        }}
      >
        Component as Header
      </h3>
    )

  return (
    <div className="App">
      <p className="Table-header">react-bootstrap-table-next</p>
      <BootstrapTable
        caption={<CaptionElement />}
        // caption="Plain text header"
        wrapperClasses="boo"
        // classes="foo"
        keyField="id"
        // data={[]}
        // noDataIndication={indication} //Індикатор пустої БД ??? не працює
        data={data}
        columns={columns}
        striped // смугастий
        hover // наведення
        condensed //стислий ????
        // bordered={false} //Відміна обрамлення
        // filter={filterFactory()}
        // pagination={paginationFactory()}
        selectRow={{ mode: "checkbox", clickToSelect: true }}
        // expandRow={expandRow}
      />
    </div>
  )
}
