//pages/api/doc_check_products/select-all.js

import { pgclient } from "../../../../../config/dbShop"

pgclient.connect() //https://www.taniarascia.com/node-express-postgresql-heroku/

export default function handler(req, resp, done) {
  console.log("doc_check_products/select-all.js/handler=")
  try {
    const sql =
      "SELECT doc_check_products.id,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,check_id,doc_check_products.ov_id,doc_check_products.price,quantity,discount,round((doc_check_products.price*quantity-discount),2) AS total,d_product.name AS name,d_ov.name AS ov FROM doc_check_products JOIN d_product ON d_product.id = doc_check_products.product_id JOIN d_ov ON d_ov.id = doc_check_products.ov_id ORDER BY id DESC"
    // const sql = "SELECT * FROM doc_check_products ORDER BY id ASC"
    pgclient.query(sql, (error, results) => {
      if (error) {
        throw error
      }
      // console.log("select-all/results.rows=", results.rows);
      resp.status(200).json(results.rows)
    })
  } catch (e) {
    resp.status(500).json({ message: e.message })
  }
  //   resp.status(200).json(product) //Бере дані з const product
}
