//pages/api/d_product/insert.js

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  const sql =
    "insert into  d_product(name,category_id,price,brand_id,img,ov_id,skod,uktzed,pdv,akcuz) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *"
  const body = req.body //Для feth- не треба перетворення json ->obj
  const sqlvalues = [
    body.name,
    body.category_id,
    body.price,
    body.brand_id,
    body.img,
    body.ov_id,
    body.skod,
    body.uktzed,
    body.pdv,
    body.akcuz,
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
