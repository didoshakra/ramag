//d_doc_check_head.js //Основа- Довідник/НеДовідник
//2-а файли+agGrid.js

import { pool } from "../../../config/dbShop"
import Layout from "../../../components/Main/Layout"
import GDocCheckHead from "../../../components/Shop/Docs/DocCheckHead/GDocCheckHead"

export default function DocCheckHead({ serverData }) {
  return (
    <Layout>
      {/* <div style={{ position: "relative", width: "calc(100vw-300px)", height: "calc(100vh - 100px)" }}> */}
      <div style={{ position: "absolute", width: "calc(100vw)", height: "calc(100vh - 100px)" }}>
        <GDocCheckHead data={serverData} />
      </div>
    </Layout>
  )
}

//= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  let data = {}
  const res = await pool.connect((err, client, done) => {
    const sql = `SELECT doc_check_head.id,place,user_id,client_id,total,discount,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,d_departament.name AS departament,d_user.name AS user,d_client.name AS client FROM doc_check_head JOIN d_departament ON d_departament.id = doc_check_head.departament_id JOIN d_user ON d_user.id = doc_check_head.user_id JOIN d_client ON d_client.id = doc_check_head.client_id WHERE doc_check_head.departament_id = ${par.p1} AND place = ${par.p2}  ORDER BY id DESC`
    if (err) throw err //видає опис помилки підключення
    data = client.query(sql, (err, result) => {
      done() // call `done()` to release the client back to the pool
      if (err) {
        console.log("error running query", err)
      } else {
        return result.rows
        // resp.status(200).json(result.rows)
      }
    })
  })
  //**************************** */
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { serverData: data }, // буде передано компоненту сторінки як атрибути
  }
}
