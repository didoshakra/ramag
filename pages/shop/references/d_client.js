//d_client.js //Основа- Довідник/НеДовідник\getServerSideProps(context)/useSWR/agGrid\...Form
import { pool } from "../../../config/dbShop"
import Layout from "../../../components/Main/Layout"
import GClient from "../../../components/Shop/References/Client/GClient"

export default function DClient({
  serverData, //Вхідні дані з Сервера(getServerSideProps)
  isDovidnuk = false, //Чи відкривати як довідник(з ...Form)
  setDovActive, //Назва довідника(з ...Form)
  setValue, //Для зміни Input в формі вводу даних(з ...Form)
}) {
  const Dovidnuk = () => {
    return (
      <div style={{ position: "relative", width: "600px", height: "400px", maxWidth: "calc(100vw - 20px)" }}>
        <GClient serverData={serverData} isDovidnuk={isDovidnuk} setDovActive={setDovActive} setValue={setValue} />
      </div>
    )
  }
  const NeDovidnuk = () => {
    return (
      <Layout>
        <div style={{ position: "relative", width: "calc(100vw)", height: "calc(100vh - 150px)" }}>
          <GClient serverData={serverData} isDovidnuk={isDovidnuk} />
        </div>
      </Layout>
    )
  }
  return <>{isDovidnuk ? <Dovidnuk /> : <NeDovidnuk />}</>
}

// //= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  let data = {}
  const resp = await pool.connect((err, client, done) => {
    const sql = "select * from d_client ORDER BY id DESC"
    if (err) throw err //видає опис помилки підключення
    data = client.query(sql, (err, result) => {
      //   console.log("Category.js/getServerSideProps/result.rows=", result.rows)
      done() // call `done()` to release the client back to the pool
      if (err) {
        console.log("error running query", err)
      } else {
        return result.rows
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
