//d_brand.js //Основа- Довідник/НеДовідник
import { pool } from "../../../config/dbShop"
import Layout from "../../../components/Main/Layout"
import GBrand from "../../../components/Shop/References/Brand/GBrand"

// //= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  console.log("d_brand.js/getServerSideProp/context")
  //   let datas = {}
  const resp = await pool.connect((err, client, done) => {
    const sql = "select * from d_brand ORDER BY id DESC"
    if (err) throw err //видає опис помилки підключення
    const datas = client.query(sql, (err, result) => {
      console.log("Category.js/getServerSideProps/result.rows*=", result.rows)
      done() // call `done()` to release the client back to the pool
      if (err) {
        console.log("error running query", err)
      } else {
        return result.rows
      }
    })
    console.log("d_brand.js/getServerSideProp/datas==", datas)
  })
  const datas1 = await result.rows
  //**************************** */
  console.log("d_brand.js/getServerSideProp/datas=", datas1)

  //   if (!datas) {
  //     return {
  //       notFound: true,
  //     }
  //   }
  //   const datas = await resp
  return {
    props: { serverData: {} }, // буде передано компоненту сторінки як атрибути
  }
}


export default function DBrand({
  serverData, //Вхідні дані з Сервера(getServerSideProps)
  isDovidnuk = false, //Чи відкривати як довідник(з ...Form)
  setDovActive, //Назва довідника(з ...Form)
  setValue, //Для зміни Input в формі вводу даних(з ...Form)
}) {
  console.log("d_brand.js/DBrand/serverData", serverData)
    const Dovidnuk = () => {
      return (
        // <div style={{ position: "relative", top:"100px" ,width: "600px", height: "400px", maxWidth: "calc(100vw - 20px)" }}>
        <div style={{ position: "relative", top: "0", width: "600px", height: "500px", maxWidth: "calc(100vw - 20px)" }}>
          <GBrand serverData={serverData} isDovidnuk={isDovidnuk} setDovActive={setDovActive} setValue={setValue} />
        </div>
      )
    }
    const NeDovidnuk = () => {
      return (
        <Layout>
          <div style={{ position: "relative", width: "calc(100vw)", height: "calc(100vh - 150px)" }}>
            <GBrand serverData={serverData} isDovidnuk={isDovidnuk} />
          </div>
        </Layout>
      )
    }
    return <>{isDovidnuk ? <Dovidnuk /> : <NeDovidnuk />}</>
}
