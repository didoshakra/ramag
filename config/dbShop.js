//config/psql-db.js
//Підключення до PosgreSQL
//https://medium.com/@dannibla/connecting-nodejs-postgresql-f8967b9f5932
const { Pool, Client } = require("pg")
// const connectionString = "postgres://postgres:root@localhost/shop" // Для  PostgresDB
const connectionString = "postgres://postgres:root@localhost/dra_test" // Для  PostgresDB
//----------------------/"postgres://login:password@localhost/nameBD"

export const pgclient = new Client({
  connectionString: connectionString,
})

// export const pool = new Pool({
//   connectionString: connectionString,
// })

// //== amazon
// export const pool = new Pool({
//   host: "dra-test.cgpdbxmggbt8.eu-west-2.rds.amazonaws.com",
//   database: "mypostgres",
//   user: "postgres", //login
//   password: "mypostgres",
//   port: 5432,
// })

//== ElephantSQL new
 export const pool = new Pool({
   host: "trumpet.db.elephantsql.com",
   user: "yimqtafp", //login
   database: "yimqtafp",
   password: "AIVGRFo7rTOEHG0E7DEKMDcGPetFslYT",
   port: 5432,
 })



// //== Veles
// export const pool = new Pool({
//   host: "62.122.207.188",
//   user: "dra_test2", //login
//   database: "dra_test",
//   password: "23487318Qwe",
//   port: 5432,
// })

// //== localhost
// export const pool = new Pool({
//   host: "localhost",
//   user: "postgres", //login
//   database: "shop",
//   password: "root",
//   port: 5432,
//   // port: 3211//Можна і такий порт
// })

// пул із повідомленням про помилку від імені будь-яких неактивних клієнтів
// містить дані про помилку серверної частини чи розділення мережі
postgres: pool.on("error", (err, client) => {
  console.error("Неочікувана помилка на неактивному клієнті", err) // your callback here
  process.exit(-1)
})
