//pages/api/d_product/select-all.js
import { pgclient } from "../../../../../config/dbShop"

pgclient.connect() //https://www.taniarascia.com/node-express-postgresql-heroku/

export default function handler(req, resp, done) {
  //   console.log("admin/product/select-all.js/handler=")
  try {
    const sql =
      "SELECT d_product.id,d_product.name,category_id,price,brand_id,img,ov_id,skod,uktzed,pdv,akcuz,d_category.name AS category,d_brand.name AS brand,d_ov.name AS ov FROM d_product JOIN d_category ON d_category.id = d_product.category_id   JOIN d_brand ON d_brand.id = d_product.brand_id JOIN d_ov ON d_ov.kod = d_product.ov_id  ORDER BY id DESC"

    // const sql =
    //   "SELECT p.id,p.name,p.category_id AS category_id, c.name AS category ,p.price,p.brand AS brand_id,b.name AS brand,p.img,p.ov AS ov_id,o.name AS ov,p.skod,p.uktzed,p.pdv,p.akcuz FROM d_product AS p, d_category AS c,d_brand AS b,d_ov AS o WHERE p.category_id = c.id AND p.brand = b.id AND p.ov = o.kod ORDER BY id DESC "
    // ORDER BY id ASC
    // const sql = "SELECT * FROM d_product ORDER BY id ASC"
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
