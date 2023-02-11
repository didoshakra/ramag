///pages/api/shop/docs/doc_check_products/insert.js

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  console.log("d_doc_check_products/insert.js/req.method=", req.method)
  //   console.log("d_doc_check_products/insert.js/req.method=", req.method)
  const sqltext =
    "insert into doc_check_products(check_id,product_id,ov_id,price,quantity,discount,departament_id,place,client_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *"
  // const users = JSON.parse(req.body); //Для feth- не треба переиворення json ->obj
  const bodyData = req.body //Для feth- не треба перетворення json ->obj
  console.log("doc_check_products/insert.js/users", bodyData)
  const sqlvalues = [
    bodyData.check_id,
    bodyData.product_id,
    bodyData.ov_id,
    bodyData.price,
    bodyData.quantity,
    bodyData.discount,
    bodyData.departament_id,
    bodyData.place,
    bodyData.client_id,
  ]
  try {
    // Без Promise(працює);
    // .query("insert into  users(first_name, last_name) sqlvalues('Ром','Дід') returning *",(err, results) => {
    pool.query(sqltext, sqlvalues, (err, results) => {
      if (err) {
        // console.log("+++api/users/insert/Помилка запиту до posgreSQL",err.stack);
        let error = {
          stack: err.stack,
          message: "Помилка запиту до БД posgreSQL",
        }
        resp.status(400).json(error) //(Bad Request/Поганий запит до БД)
      } else {
        // resp.status(200).json(results.rows[0])//Повертає обєкт даних
        resp.status(200).json(results.rowCount) //якщо в запиті нема RETURNING/ rowCount-к-кість успішних рядків
        // console.log("+++insert,js/try/results.rowCount=", results.rowCount)
      }
    })
  } catch (err) {
    resp.status(500).json({ message: err.message })
  }
}
