//pages/api/doc_check_head/[...slug].js
//Dynamic API Routes\ параметри

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp, done) {
  const par = req.query.slug
  const sql = `SELECT doc_check_head.id,place,user_id,client_id,total,discount,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,d_departament.name AS departament,d_user.name AS user,d_client.name AS client FROM doc_check_head JOIN d_departament ON d_departament.id = doc_check_head.departament_id JOIN d_user ON d_user.id = doc_check_head.user_id JOIN d_client ON d_client.id = doc_check_head.client_id WHERE doc_check_head.departament_id = ${par[0]} AND place = ${par[1]}  ORDER BY id DESC`

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
