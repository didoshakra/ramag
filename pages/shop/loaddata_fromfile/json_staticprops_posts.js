//Next.js: Reading and Display Data from a Local JSON File
//https://www.kindacode.com/article/next-js-reading-and-display-data-from-a-local-json-file/#Conclusion

import Head from "next/head"


export default function JsonGetStatPropsPosts(props) {
  const posts = props.posts
  return (
    <div style={{ padding: 30 }}>
      <Head>
        <title>KindaCode.com</title>
      </Head>
      <div>
        <h2 style={{ color: "red", textAlign: "center" }}>Як завантажити дані з файлу в Next.js (getStaticProps)</h2>
        <h3 style={{ color: "green", textAlign: "center" }}>
          //https://www.kindacode.com/article/next-js-reading-and-display-data-from-a-local-json-file/#Conclusion
        </h3>

        <div>
          {posts.map((post) => (
            <div key={post.id} style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Fetching data from the JSON file
import path from "path"
import { promises as fs } from "fs"
// import fsPromises from "fs/promises"

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/json/posts.json")
  //   const jsonData = await fsPromises.readFile(filePath)
  const jsonData = await fs.readFile(filePath, "utf8")
  const objectData = JSON.parse(jsonData)

  return {
    props: objectData,
  }
}
