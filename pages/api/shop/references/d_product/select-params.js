//pages/api/d_product/select-params.js
//Dynamic API Routes\ параметри

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  const body = req.body //Для feth- не треба перетворення json ->obj
  //   const par = body.skod //values
  const par = body //singleValue
  console.log("/api/d_product/select-params.js/par=", par) // your callback here
//   const sql = `SELECT d_product.id,d_product.name,price,skod ,d_ov.name AS ov FROM d_product JOIN d_ov ON d_ov.id = d_product.ov_id WHERE d_product.skod = '4820192681810'`
  const sql = `SELECT d_product.id,d_product.name,price,skod ,d_ov.name AS ov FROM d_product JOIN d_ov ON d_ov.id = d_product.ov_id WHERE d_product.skod = '${par}'`

  //--- pool(promise)
  pool.connect().then((client) => {
    return client
      .query(sql) // your query string here
      .then((result) => {
        client.release() //звільнення
        console.log("*/api/d_product/select-params.js/result.rows", result.rows) // your callback here
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
