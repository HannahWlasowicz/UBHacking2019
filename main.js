import sqlite3

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('discord.db');

db.each("SELECT url FROM invite_links ORDER BY RANDOM() LIMIT 1)", function(err, row)) {
  console.log("URL: "row.url);
});
db.close();
