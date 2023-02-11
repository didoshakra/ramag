///pages/api/admin/product/edit.js

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  const data = JSON.parse(req.body) //Для feth- не треба переиворення json ->obj
  console.log("edit.js/handler/req.body=", req.body)
  const sql = `UPDATE d_product SET name = '${data.name}', category = '${data.category_id}', price = '${data.price}', brand = '${data.brand_id}', img = '${data.img}', ov = '${data.ov_id}', skod = '${data.skod}', uktzed = '${data.uktzed}', pdv = '${data.pdv}', akcuz = '${data.akcuz}' WHERE id IN (${data.id})`

  try {
    // Без Promise(працює);
    pool.query(sql, (err, results) => {
      if (err) {
        // console.log("+++edit.js/handler//Помилка запиту до posgreSQL",err.stack);
        let error = {
          stack: err.stack,
          message: "Помилка запиту до БД posgreSQL",
        }
        resp.status(400).json(error)
      } else {
        resp.status(200).json(results.rowCount) //якщо в запиті нема RETURNING/ rowCount-к-кість успішних рядків
      }
    })
  } catch (e) {
    console.log("+++editjs/catch(e)/e.message=", e.message)
    resp.status(500).json({ message: e.message })
  }
}
