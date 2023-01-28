///pages/api/psql-users/delete.js

import { pool } from "../../../../../config/dbShop"
// pgclient.connect();

export default function handler(req, resp) {
  // console.log("api/admin/product/delete.js//handler/req.method=", req.method);
  //   console.log("api/admin/product/delete.js//handler/req.body=", req.body);
  //** */
  const rowsid = JSON.parse(req.body) //Для запитів до серверів використовувати формат JSON
  // const rowsid = req.body; //таж зпрацює якщо при відпрпвціі його не перетворювати;
  console.log(`api/admin/product/delete.js/rowsid= ${rowsid}`)
  const sql = `DELETE FROM d_product WHERE id IN (${rowsid})`
  try {
    pool.query(sql, (err, result) => {
      // console.log("api/admin/product/delete.js/result.rowCount", result.rowCount); //Якщо в запиті нема RETURNING *
      if (err) {
        // console.log("api/admin/product/delete.js/Помилка запиту до posgreSQL",err.stack);
        let error = {
          stack: err.stack,  
          message: "Помилка запиту до БД posgreSQL",
        }
        resp.status(400).json(error)
      } else {
        // console.log("api/admin/product/delete.js/!err/result=", result);
        resp.status(200).json(result.rowCount) //rowCount-к-кість успішних рядків
      }
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
