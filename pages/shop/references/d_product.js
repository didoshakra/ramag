//d_product.js //Основа- Довідник/НеДовідник
import { pool } from "../../../config/dbShop"
import Layout from "../../../components/Main/Layout"
import GProduct from "../../../components/Shop/References/Product/GProduct"

export default function DProduct({
  serverData, //Вхідні дані з Сервера
  isDovidnuk = false, //Чи відкривати як довідник
  setDovActive, //Назва довідника
  setValue, //Для зміни Input в формі вводу даних
  setFocus,
}) {
  const Dovidnuk = () => {
    return (
      //   <div style={{ position: "absolute", width: "770px", height: "calc(100vh - 200px)", maxWidth: "calc(100vw" }}>
      <div style={{ position: "relative", top: "0", width: "600px", height: "500px", maxWidth: "calc(100vw - 20px)" }}>
        <GProduct
          serverData={serverData}
          isDovidnuk={true}
          setDovActive={setDovActive}
          setValue={setValue}
          setFocus={setFocus}
        />
      </div>
    )
  }
  const NeDovidnuk = () => {
    return (
      <Layout>
        <div style={{ position: "relative", width: "calc(100vw)", height: "calc(100vh - 120px)" }}>
          <GProduct serverData={serverData} />
        </div>
      </Layout>
    )
  }
  return <>{isDovidnuk ? <Dovidnuk /> : <NeDovidnuk />}</>
}

//= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  //   const url = `${dbHost}${urlAPI}select-all` //
  //   const response = await fetch(url)
  //   const data = await response.json()
  //**************************** */
  let data = {}
  const res = await pool.connect((err, client, done) => {
    const sql = "select * from d_product ORDER BY id DESC"
    if (err) throw err //видає опис помилки підключення
    data = client.query(sql, (err, result) => {
      //   console.log("Category.js/getServerSideProps/result.rows=", result.rows)
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
