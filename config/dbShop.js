//config/psql-db.js
//Підключення до PosgreSQL
//https://medium.com/@dannibla/connecting-nodejs-postgresql-f8967b9f5932
const { Pool } = require("pg")

// const { Pool, Client } = require("pg")
// const connectionString = "postgres://postgres:root@localhost/shop" // Для  PostgresDB
// const connectionString = "postgres://postgres:root@localhost/dra_test" // Для  PostgresDB
//----------------------/"postgres://login:password@localhost/nameBD"

export const pool = new Pool({
  host: process.env.PGSQL_HOST,
  port: process.env.PGSQL_PORT,
  database: process.env.PGSQL_DATABASE,
  user: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
})

// export const pgclient = new Client({
//   connectionString: connectionString,
// })

// export const pool = new Pool({
//   connectionString: connectionString,
// })

// пул із повідомленням про помилку від імені будь-яких неактивних клієнтів
// містить дані про помилку серверної частини чи розділення мережі
postgres: pool.on("error", (err, client) => {
  console.error("Неочікувана помилка на неактивному клієнті", err) // your callback here
  process.exit(-1)
})
