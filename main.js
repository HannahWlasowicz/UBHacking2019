const sqlite3 = require('sqlite3');
const async = require('async');

db.getAsync = function getLink(callback){
  var val;
  var getStmt = 'SELECT url FROM invite_links WHERE id IN (SELECT id FROM invite_links ORDER BY RANDOM() LIMIT 1)';
  console.log(getStmt);
  return new Promise (function (resolve, reject) {
    db.get(getStmt, function(err, row){
    if(!row){
      if(err){
        reject(err);
      }
      console.log("invalid url");
    }
    else{
      resolve(row.url);
      console.log(val + " url value");

    }
  });
});

}
console.log('sqlite3...');

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
    console.log("URL:"+row.url);
    link = row.url;

    return row.url;
  });

  db.close((err) => {
      if(err){
          console.error(err.message);
      }
      console.log('Close the database connection.');
  });
