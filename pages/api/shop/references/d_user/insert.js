//pages/api/d_user/insert.js
//node-postgres.com/features/queries

import { pool } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  const data = req.body //Для feth- не треба перетворення json ->obj
  const sql = "insert into  d_user(name,last_name,login,password,profile) VALUES($1,$2,$3,$4,$5) RETURNING *"
  const sqlvalues = [data.name, data.last_name, data.login, data.password, data.profile]

  //--- pool(promise)
  pool.connect().then((client) => {
    return client 
      .query(sql, sqlvalues) // your query string here
      .then((result) => {
        client.release() //звільнення
        resp.status(200).json(result.rows[0])
      }) // your callback here
      .catch((err) => {
        client.release() //звільнення
        console.log(err.stack) // your callback here
        resp.status(500).json({ message: err.message })
      })
  })
}
