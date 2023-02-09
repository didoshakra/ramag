///pages/api/shop/docs/doc_check_head/insert.js

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  const sql =
    "insert into doc_check_head(departament_id,place,user_id,client_id,total,discount) VALUES($1,$2,$3,$4,$5,$6) RETURNING *"
  const bodyData = req.body //Для feth- не треба перетворення json ->obj
  const sqlvalues = [
    bodyData.departament_id,
    bodyData.place,
    bodyData.user_id,
    bodyData.client_id,
    bodyData.total,
    bodyData.discount,
  ]

  //--- pool(promise)
  pool.connect().then((client) => {
    return client
      .query(sql, sqlvalues) // your query string here
      .then((result) => {
        client.release() //звільнення
        resp.status(200).json(result.rows[0])
      }) // your callback here
      .catch((err) => {
        client.release() //звільнення
        console.log(err.stack) // your callback here
        resp.status(500).json({ message: err.message })
      })
  })
}
