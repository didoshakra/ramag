//pages/api/doc_check_products/select-seqence.js
//Отримати код з послідовності(для майбутного id)// SELECT nextval('doc_check_products_id_seq')//Не зробив

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  //   const body = req.body //Для feth- не треба перетворення json ->obj
  console.log("/api/doc_check_products/select-seqence.js/") // your callback here
  const sql = `SELECT nextval('doc_check_products_id_seq')`

  //--- pool(promise)
  pool.connect().then((client) => {
    return client
      .query(sql) // your query string here
      .then((result) => {
        client.release() //звільнення
        // console.log("*/api/doc_check_products/select-seqence.js/result=", result.rows) // your callback here
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
