//api/d_departament/select-all.js
import { pool } from "../../../../../config/dbShop"


export default function handler(req, resp) {
  const sql = "select * from d_departament ORDER BY id DESC"

  //--- pool(promise)
  pool.connect().then((client) => {
    return client
      .query(sql) // your query string here
      .then((result) => {
        client.release() //звільнення
        resp.status(200).json(result.rows)
      }) // your callback here
      .catch((err) => {
        client.release() //звільнення
        console.log(err.stack) // your callback here
        resp.status(500).json({ message: err.message }) //Помилка виконання запиту
      })
  })

  //--- pool(notPromise)(працює)
  //   pool.connect((err, client, done) => {
  //     if (err) throw err //видає опис помилки підключення
  //     client.query(sql, (err, result) => {
  //       done() // call `done()` to release the client back to the pool
  //       if (err) {
  //         console.log("error running query", err)
  //       } else {
  //         resp.status(200).json(result.rows)
  //       }
  //     })
  //   })
}