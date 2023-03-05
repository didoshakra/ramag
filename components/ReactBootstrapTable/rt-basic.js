import Table1 from './components/Table1'
var data = [
  {id: 1, name: 'Gob', value: '2'},
  {id: 2, name: 'Buster', value: '5'},
  {id: 3, name: 'George Michael', value: '4'}
];

export default function RTBasic() {
    return (
      <div className="App">
        <p className="Table-header">Basic Table</p>
        <Table1 data={data}/>
      </div>
    );
}