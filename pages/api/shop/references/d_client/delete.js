//pages/api/references/d_client/delete.js

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  const rowsid = JSON.parse(req.body) //Для запитів до серверів використовувати формат JSON
  const sql = `DELETE FROM d_client WHERE id IN (${rowsid})`

  //--- pool(promise)
  pool.connect().then((client) => {
    return client
      .query(sql) // your query string here
      .then((result) => {
        client.release() //звільнення
        resp.status(200).json(result.rowCount) //rowCount-к-кість успішних рядків
      }) // your callback here
      .catch((err) => {
        client.release() //звільнення
        console.log(err.stack) // your callback here
        resp.status(500).json({ message: err.message })
      })
  })
}
