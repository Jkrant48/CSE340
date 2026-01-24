const { Pool } = require("pg");
require("dotenv").config();

/************************************
 * Connect Pool
 * SSL object needed for local testing of app
 * But will cause problems in production environment
 * if-else will make sure correct config is used
 ************************************/

let pool;
if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  // Added for troubleshooting queries
  //during development
  module.exports = {
    async query(text, params) {
      try {
        const res = await pool.query(text, params);
        console.log("executed query", { text });
        return res;
      } catch (err) {
        console.error("error in query", { text });
        throw err;
      }
    },
  };
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  module.exports = pool;
}
