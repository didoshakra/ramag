//pages/api/references/d_category/edit.js

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  const data = JSON.parse(req.body) //Для feth- не треба переиворення json ->obj
  const sql = `UPDATE d_category SET name = '${data.name}' WHERE id IN (${data.id})`

  //--- pool(promise)
  pool.connect().then((client) => {
    return client
      .query(sql) // your query string here
      .then((result) => {
        client.release() //звільнення
        resp.status(200).json(result.rowCount) //якщо в запиті нема RETURNING/ rowCount-к-кість успішних рядків
      }) // your callback here
      .catch((err) => {
        client.release() //звільнення
        console.log(err.stack) // your callback here
        resp.status(500).json({ message: err.message })
      })
  })
}