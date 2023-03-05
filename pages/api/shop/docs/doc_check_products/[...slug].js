//pages/api/doc_check_products/[...slug].js
//Dynamic API Routes\ параметри

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp, done) {
  const par = req.query.slug
  console.log("pages/api/doc_check_products/[...slug].js/par[0]=", par[0])

  const sql = `SELECT doc_check_products.id,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,check_id,doc_check_products.ov_id,doc_check_products.price,quantity,discount,round((doc_check_products.price*quantity-discount),2) AS total,d_product.name AS name,d_ov.name AS ov FROM doc_check_products JOIN d_product ON d_product.id = doc_check_products.product_id JOIN d_ov ON d_ov.id = doc_check_products.ov_id WHERE doc_check_products.check_id = ${par[0]} ORDER BY id DESC`
  // const sql = "SELECT * FROM doc_check_products ORDER BY id ASC"

  //--- pool(promise)
  pool.connect().then((client) => {
    return client
      .query(sql) // your query string here
      .then((result) => {
        client.release() //звільнення
        resp.status(200).json(result.rows)
      }) // your callback here
      .catch((err) => {
        client.release() //звільнення
        console.log(err.stack) // your callback here
      })
  })

  //--- pool(notPromise)(працює)
  //   pool.connect((err, client, done) => {
  //     if (err) throw err //видає опис помилки підключення
  //     client.query(sql, (err, result) => {
  //       done() // call `done()` to release the client back to the pool
  //       if (err) {
  //         console.log("error running query", err)
  //       } else {
  //         resp.status(200).json(result.rows)
  //       }
  //     })
  //   })
}
