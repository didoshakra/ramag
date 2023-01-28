//useSWR allows the use of SWR inside function components
import useSWR from "swr"

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function JsonApiSWRObj() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  //   const { data, error } = useSWR("/api/staticdata/datajson", fetcher)
  const { data, error } = useSWR("/api/staticdata", fetcher)

  //Handle the error state
  if (error) return <div>Failed to load</div>
  //Handle the loading state
  if (!data) return <div>Loading...</div>
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file

  console.log("import_json.js/data=", data)
  console.log("import_json.js/data.record=", data.record)

  return (
    <div>
      <h2 style={{ color: "red", textAlign: "center" }}>Як завантажити дані з файлу в Next.js(api-useSWR)</h2>
      <h3 style={{ color: "green", textAlign: "center" }}>
        //https://vercel.com/guides/loading-static-file-nextjs-api-route
      </h3>
      <ul style={{ color: "blue" }}>
        <li>Name: {data.record.name}</li>
        <li>Language: {data.record.language}</li>
      </ul>
    </div>
  )
}
