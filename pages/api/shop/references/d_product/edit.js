//pages/api/d_product/edit.js

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
 const data = JSON.parse(req.body) //Для feth- не треба переиворення json ->obj
 console.log("edit.js/handler/req.body=", req.body)
 const sql = `UPDATE d_product SET name = '${data.name}', category_id = '${data.category_id}', price = '${data.price}', brand_id = '${data.brand_id}', img = '${data.img}', ov_id = '${data.ov_id}', skod = '${data.skod}', uktzed = '${data.uktzed}', pdv = '${data.pdv}', akcuz = '${data.akcuz}' WHERE id IN (${data.id})`

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
