const sqlite3 = require("sqlite3").verbose();
let db;

const initDatabase = () => {
  db = new sqlite3.Database("./code-editor.db", (err) => {
    if (err) {
      console.error("Database opening error:", err);
    } else {
      console.log("Database connected successfully!");
    }
  });

  // Create table for code snippets
  db.run(
    "CREATE TABLE IF NOT EXISTS snippets (id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT)"
  );
};

const getDb = () => db;

module.exports = { initDatabase, getDb };
