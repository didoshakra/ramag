//pages/api/references/d_client/insert.js

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  const data = req.body //Для feth- не треба перетворення json ->obj
  console.log("d_client/insert/data=", data)
  const sql = "insert into d_client(name,last_name,email,skod,discount_proc) VALUES($1,$2,$3,$4,$5) RETURNING *"
  const sqlvalues = [data.name, data.last_name, data.email, data.skod, data.discount_proc]

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
