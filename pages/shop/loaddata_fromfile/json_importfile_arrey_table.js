// import useSWR from "swr"

//Напишіть функцію fetcher, щоб обернути власну функцію fetch і повернути результат виклику url у форматі json
// const fetcher = (url) => fetch(url).then((res) => res.json())
import JsonData from "../../../data/json/data_arrey.json"

export default function JsonImpFileArrey() {
  //   //Налаштуйте SWR для запуску функції fetcher під час виклику '/api/staticdata'
  //   //Є 3 можливі стани: (1) завантаження, коли дані нульові (2) готовість, коли дані повертаються (3) помилка, коли сталася помилка під час отримання даних
  //   const { data, error } = useSWR("/api/staticdata/datajson", fetcher)

  //   //Обробка стану помилки
  //   if (error) return <div>Failed to load</div>
  //   //Handle the loading state
  //   if (!data) return <div>Loading...</div>
  //   //Обробка стану готовності та відображення результату, що міститься в об’єкті даних, зіставленому зі структурою файлу json
  //   console.log("import_json.js/data=", data)
  console.log("import_json.js/JsonData=", JsonData)
  //****************************************************** */
  //   const DisplayData = data.map((info) => {
  const DisplayData = JsonData.map((info) => {
    return (
      <tr>
        <td>{info.id}</td>
        <td>{info.name}</td>
        <td>{info.city}</td>
      </tr>
    )
  })
  //****************************************************** */
  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ color: "red", textAlign: "center" }}>Як завантажити дані з файлу в Next.js</h2>
      <h3 style={{ color: "green", textAlign: "center" }}>
        //https://vercel.com/guides/loading-static-file-nextjs-api-route
      </h3>
      {/* <table class="table table-striped"> */}
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Sr.NO</th>
            <th>Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
    </div>
  )
}
