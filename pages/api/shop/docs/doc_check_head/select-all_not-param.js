//pages/api/doc_check_head/select-all.js
//Працює, але без переданих параметрів!!!(параметри тут!!!)

import { pgclient } from "../../../../../config/dbShop"

pgclient.connect() //https://www.taniarascia.com/node-express-postgresql-heroku/

export default function handler(req, resp, done) {
  // console.log("doc_check_head/select-all.js/handler/req=",req)
  //   const body = req.body //Для feth- не треба перетворення json ->obj
  const depId = 2
  const casId = 1
  try {
    const sql =
      "SELECT doc_check_head.id,place,user_id,client_id,total,discount,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,d_departament.name AS departament,d_user.name AS user,d_client.name AS client FROM doc_check_head JOIN d_departament ON d_departament.id = doc_check_head.departament_id JOIN d_user ON d_user.id = doc_check_head.user_id JOIN d_client ON d_client.id = doc_check_head.client_id WHERE doc_check_head.departament_id =" +
      depId +
      "AND place = " +
      casId +
      "   ORDER BY id DESC"
    // const sql =
    //   "SELECT doc_check_head.id,place,user_id,client_id,total,discount,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,d_departament.name AS departament,d_user.name AS user,d_client.name AS client FROM doc_check_head JOIN d_departament ON d_departament.id = doc_check_head.departament_id JOIN d_user ON d_user.id = doc_check_head.user_id JOIN d_client ON d_client.id = doc_check_head.client_id WHERE doc_check_head.departament_id =2 AND place = 1   ORDER BY id DESC"
    // const sql =
    //   "SELECT doc_check_head.id,place,user_id,client_id,total,discount,COALESCE(to_char(datetime, 'MM-DD-YYYY HH24:MI:SS'), '') AS datetime,d_departament.name AS departament,d_user.name AS user,d_client.name AS client FROM doc_check_head JOIN d_departament ON d_departament.id = doc_check_head.departament_id JOIN d_user ON d_user.id = doc_check_head.user_id JOIN d_client ON d_client.id = doc_check_head.client_id  ORDER BY id DESC"
    // const sql = "SELECT * FROM doc_check_head ORDER BY id ASC"
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
