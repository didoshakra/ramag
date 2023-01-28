//pages/api/references/d_brend/select-all.js
//https://stackoverflow.com/questions/50497583/when-to-disconnect-and-when-to-end-a-pg-client-or-pool
//https://node-postgres.com/features/queries
//pgclient(notPromise+Promise)\rob без // pgclient.end() i then(() => pgclient.end()
//select-all_Rob-pgclientl-All-notEnd

import { pgclient } from "../../../../../config/dbShop"

export default function handler(req, resp) {
  //   console.log("admin/product/select-all.js/handler=")
  const sql = "select *  from d_brand ORDER BY id DESC"
  pgclient.connect()

  //--- pgclient(notPromise) /працює без  pgclient.end()
  // pgclient.query(sql, (error, results) => {
  //   if (error) throw error
  //   resp.status(200).json(results.rows)
  //   // pgclient.end()// не працює
  // })

  //--- pgclient(promise) /працює без .then(() => pgclient.end())
  pgclient
    .query(sql) // your query string here
    .then((result) => {
      console.log("result=", result.rows)
      resp.status(200).json(result.rows)
    }) // your callback here
    .catch((e) => console.error(e.stack)) // your callback here
//   .then(() => pgclient.end()) //Якщо закрити то помилка:Error: Client has already been connected. You cannot reuse a client.
}
