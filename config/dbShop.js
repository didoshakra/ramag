//config/psql-db.js
//Підключення до PosgreSQL
//https://medium.com/@dannibla/connecting-nodejs-postgresql-f8967b9f5932
const { Pool, Client } = require("pg")
const connectionString = "postgres://postgres:root@localhost/shop" // Для  PostgresDB
//----------------------/"postgres://login:password@localhost/nameBD"

export const pgclient = new Client({
  connectionString: connectionString,
})

export const pool = new Pool({
  connectionString: connectionString,
})

// export const pool = new Pool({
//   user: "postgres", //login
//   host: "localhost",
//   database: "pgNode_db",
//   password: "postgres",
//   // port: 3211
// port: 5432//Можна і такий порт
// });

// пул із повідомленням про помилку від імені будь-яких неактивних клієнтів
// містить дані про помилку серверної частини чи розділення мережі
pool.on("error", (err, client) => {
  console.error("Неочікувана помилка на неактивному клієнті", err) // your callback here
  process.exit(-1)
})
