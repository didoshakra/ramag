//pages/api/references/d_brend/select-all.js
// select-all-PoolAll-rob-Працює pool(notPromise+Promise)
//https://stackoverflow.com/questions/50497583/when-to-disconnect-and-when-to-end-a-pg-client-or-pool
//https://node-postgres.com/features/pooling

import { pool } from "../../../../../config/dbShop"

// пул із повідомленням про помилку від імені будь-яких неактивних клієнтів
// містить дані про помилку серверної частини чи розділення мережі
// pool.on("error", (err, client) => {
//   console.error("Неочікувана помилка на неактивному клієнті", err) // your callback here
//   process.exit(-1)
// })

export default function handler(req, resp) {
//   console.log("api/.../d_brand/select-all.js/handler")
  //(pool)
  const sql = "select *  from d_brand ORDER BY id DESC"

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
        resp.status(500).json({ message: err.message })
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
