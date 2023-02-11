///pages/api/admin/product/insert.js
//node-postgres.com/features/queries

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  console.log("+++insert.js/handler34/req.method=", req.method)
  const sqltext =
    "insert into  d_product(name,category,price,brand,img,ov,skod,uktzed,pdv,akcuz) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *"
  //   const sqlvalues = ["Роман-34", "Дідошак-34", 44, "https://www.ukr.net/ua/34", "05034", "лікар", "2018-12-22"]
  // const users = JSON.parse(req.body); //Для feth- не треба переиворення json ->obj
  const bodyData = req.body //Для feth- не треба перетворення json ->obj
  console.log("+++insert.js/users", bodyData)
  const sqlvalues = [
    bodyData.name,
    bodyData.category_id,
    bodyData.price,
    bodyData.brand_id,
    bodyData.img,
    bodyData.ov_id,
    bodyData.skod,
    bodyData.uktzed,
    bodyData.pdv,
    bodyData.akcuz,
  ]
  try {
    // Без Promise(працює);
    pool.query(sqltext, sqlvalues, (err, results) => {
      if (err) {
        // console.log("+++api/users/DEL/Помилка запиту до posgreSQL",err.stack);
        let error = {
          stack: err.stack,
          message: "Помилка запиту до БД posgreSQL",
        }
        resp.status(400).json(error)
      } else {
        // resp.status(200).json(result.rowCount); //якщо в запиті нема RETURNING/ rowCount-к-кість успішних рядків
        // console.log("+++insert,js/try/results.rows=", results.rows);
        console.log("+++insert,js/try/results.rows[0]=", results.rows[0])
        resp.status(200).json(results.rows[0])
      }
    })
    //*** Promise(працює)  //https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/
    // return new Promise(function (resolve, reject) {
    //   pool.query(sqltext, sqlvalues, (err, results) => {
    //     if (err) {
    //       reject(err);
    //     }
    //     resolve(`A new merchant has been added added: ${results.rows[0]}`);
    //   });
    // });
    //** */
  } catch (e) {
    console.log("+++insert,js/catch(e)/e.message=", e.message)
    resp.status(500).json({ message: e.message })
  }
}
