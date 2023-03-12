//doc_check_products.js //Товари в чеку-//Добавлення в масив
//Є PaymentDialo/ClientDialog/BackDialog
//Добавлення в масив і для agGrid оновлюю  масив setRowData(rows1)
//Початкові дані для agGrid з БД !!!
// Перерахунок знижки по клієнту
//При добаленні не створюєм шапку документа doc_check_head, а входим в документ(doc_check_products)
// ****** не раалізував ****
// № чеку для check_id,беремо з select-seqence (SELECT nextval('doc_check_head_id_seq')`)/ Не зміг реалізувати добвлення в doc_check_head з зарезервованим check_id(nextval)-> cannot insert a non-DEFAULT value into column "id" / undefined
//При збереженні документа, в циклі добавляю шапку документа в doc_check_head з усіма даними з масивів  і отримавши doc_check_head.id  добавляю дані в таблицю doc_check_products, де nom_check=doc_check_head.id
//-------------------------------------------------------
import useSWR from "swr" //https://www.setup.pp.ua/2020/06/useswr-react.html
import { pool } from "../../../config/dbShop"
import GDocCheckProducts from "../../../components/Shop/Docs/DocCheckProducts/GDocCheckProducts"

// const urlAPI = "/api/shop/docs/doc_check_products/" // Для useSWR/getServerSideProp i...
// const fetcher = (url) => fetch(url).then((res) => res.json()) // Для useSWR

//= Загрузка даних на сервері getServerSideProps()/getStaticProps() \\Тільки на сторінках(не викликається як компонент)
export async function getServerSideProps(context) {
  let data = {}
  const res = await pool.connect((err, client, done) => {
    const sql = `SELECT doc_check_products.id,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,check_id,doc_check_products.ov_id,doc_check_products.price,quantity,discount,round((doc_check_products.price*quantity-discount),2) AS total,d_product.name AS name,d_ov.name AS ov FROM doc_check_products JOIN d_product ON d_product.id = doc_check_products.product_id JOIN d_ov ON d_ov.id = doc_check_products.ov_id WHERE doc_check_products.check_id = ${headData.id} ORDER BY id DESC`
    // const sql = `SELECT doc_check_products.id,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,check_id,doc_check_products.ov_id,doc_check_products.price,quantity,discount,round((doc_check_products.price*quantity-discount),2) AS total,d_product.name AS name,d_ov.name AS ov FROM doc_check_products JOIN d_product ON d_product.id = doc_check_products.product_id JOIN d_ov ON d_ov.id = doc_check_products.ov_id WHERE doc_check_products.check_id = ${headData.id} ORDER BY id DESC`
    // const sql = "select * from d_category ORDER BY id DESC"
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

export default function DocCheckProducts({ serverData, setDocContent, headData, setHeadData }) {
        console.log("*/*******serverData", serverData)

    // ******************************************************************
//   //--- Загрузка даних на фронтенді useSWR // refreshInterval: 0,
//   // console.log("GDocCheckProducts.js/useSWR/headData.id=", headData.id)
//   const { data, error } = useSWR(`${urlAPI}${headData.id}`, fetcher, {})

//   if (error) return <div>не вдалося завантажити</div>
//   if (!data) return <p>Loading/Завантаження ...</p>

  // ******************************************************************
  return (
    <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
      {/* <div style={{ position: "relative", width: "calc(100vw)", height: "calc(100vh - 350px)" }}> */}
      <GDocCheckProducts
        // serverData={serverData}
        data={serverData}
        setDocContent={setDocContent}
        headData={headData}
        setHeadData={setHeadData}
      />
    </div>
  )
}

