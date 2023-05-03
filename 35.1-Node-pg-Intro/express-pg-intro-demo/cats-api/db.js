/** Database setup for cats. */
const { Client } = require("pg");

const DB_URI = (process.env.NODE_ENV === "test")
  ? "postgresql:///cats_test"
  : "postgresql:///cats";

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;
