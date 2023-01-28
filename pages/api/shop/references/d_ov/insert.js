///pages/api/d_ov/insert.js

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  const data = req.body //Для feth- не треба перетворення json ->obj
  const sql = "insert into d_ov(kod,name) VALUES($1,$2) RETURNING *"
  const sqlvalues = [data.kod, data.name]

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
        resp.status(500).json({ message: err.message }) //Помилка виконання запиту
      })
  })
}