/** Database connection for Microblog. */

const { Client } = require("pg");

const client = new Client(process.env.DATABASE_URL || "postgresql:///microblog");

client.connect();

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "mircoblog-test";
} else {
  DB_URI  = process.env.DATABASE_URL || 'microblog';
}


module.exports = client;
