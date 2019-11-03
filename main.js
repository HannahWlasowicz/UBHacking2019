import sqlite3

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('discord.db', sqlite3.OPEN_READONLY, (err) =>{
    if(err){
        console.error(err.message);
    }
    console.log('Connected to the discord database.');
});

db.each("SELECT url FROM invite_links WHERE id IN (SELECT id FROM invite_links ORDER BY RANDOM() LIMIT 1)", (err, row) => {
    if (err){
        console.error(err.message);
    }
  console.log("URL:" row.url);
});


db.close((err) => {
    if(err){
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
