const Discord = require('discord.js');
const bot = new Discord.Client();
const sqlite3 = require('sqlite3');
// const async = require('async');
//test
const token = 'NjQwMjgzNjEwNDU2NTIyNzUy.Xb3qvQ.aVNwLMqlN_Pb3FHFjy__z_S1AQw';
const PREFIX = '!';

bot.on('ready',()=>{
  console.log('This bot is online!');
  bot.user.setActivity('with life!');
});

bot.on('guildMemberAdd', member=>{
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;
    const rules = member.guild.channels.find(rules => rules.name === "rules")
    channel.send(`Welcome to our server, ${member}, please read the rules in the ${rules} channel! <3`)
});



bot.on('message', message=>{
    let args  = message.content.substring(PREFIX.length).split(" ");
    let msg = message.content;
    
    if (msg == "no you" || msg == "no u"){
        message.channel.send("no YOU")
    }

    switch(args[0]){
       case 'ping':
        message.channel.send('pong!');
        break;

        case 'commands':
            message.channel.send('!raid, !clear {number}, !embed, !finance, !ping, !info version, !suckone');
            break;

      case 'info':
        if(args[1] == 'version'){
            message.channel.send('version '+ '1.0.1');
        }
        else{
            message.channel.send('invalid args');
        }
        break;

      case 'clear':
        if(!args[1]){
            return message.reply('Error; please define a second argument.');
        }
        message.channel.bulkDelete(args[1]);
        break;

      case 'embed':
            let hex = '#'+Math.floor(Math.random()*16777215).toString(16);
            const embed = new Discord.RichEmbed()
            .setTitle('User Information')
            .addField('User', message.author.username)
            .addField('Current Server', message.guild.name)
            .setColor(hex)
            .setThumbnail(message.author.avatarURL)

            message.channel.sendEmbed(embed);
            break;
      case 'finance':
          message.channel.send('https://learn.saylor.org/course/view.php?id=63&sectionid=596');
          break;
      case 'suckone':
        message.reply('Suckon deeze nuts boi!');
        break;
      case 'raid':
            // const req = require('./main.js');
            //const invite = req.getLink;

              // console.log(invite + "inside the index file");
              console.log("Called function");
              // message.channel.send(invite + " Hello spicy people");
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

                message.channel.send(row.url + " Join at your own risk!");
              });

              db.close((err) => {
                  if(err){
                      console.error(err.message);
                  }
                  console.log('Close the database connection.');
              });
              break;
    }
})

bot.login(token);


// const async = require('async');

// db.getAsync = function getLink(callback){
//   var val;
//   var getStmt = 'SELECT url FROM invite_links WHERE id IN (SELECT id FROM invite_links ORDER BY RANDOM() LIMIT 1)';
//   console.log(getStmt);
//   return new Promise (function (resolve, reject) {
//     db.get(getStmt, function(err, row){
//     if(!row){
//       if(err){
//         reject(err);
//       }
//       console.log("invalid url");
//     }
//     else{
//       resolve(row.url);
//       console.log(val + " url value");
//
//     }
//   });
// });
//
// }
// console.log('sqlite3...');
//
//   const db = new sqlite3.Database('discord.db', sqlite3.OPEN_READONLY, (err) =>{
//       if(err){
//           console.error(err.message);
//       }
//       console.log('Connected to the discord database.');
//   });
//
//   db.each("SELECT url FROM invite_links WHERE id IN (SELECT id FROM invite_links ORDER BY RANDOM() LIMIT 1)", (err, row) => {
//       if (err){
//           console.error(err.message);
//       }
//     console.log("URL:"+row.url);
//     link = row.url;
//
//     return row.url;
//   });
//
//   db.close((err) => {
//       if(err){
//           console.error(err.message);
//       }
//       console.log('Close the database connection.');
//   });
// // https://gist.github.com/yizhang82/2ab802f1439490984eb998af3d96b16b
//   function voteAsync(voter) {
//       var val;
//       var getStmt = `SELECT Name, Count FROM Voters WHERE Name="${voter}"`;
//       console.log(getStmt);
//       return db.getAsync(getStmt).then((row) => {
//           if (!row) {
//               console.log("VOTER NOT FOUND");
//               var insertSql = `INSERT INTO Voters (Name, Count) VALUES ("${voter}", 1)`;
//
//               val = 1;
//               return db.runAsync(insertSql);
//           }
//           else {
//               val = row["Count"];
//               console.log(`COUNT = ${val}`);
//               val += 1;
//
//               // update
//               var updateSql = `UPDATE Voters SET Count = ${val} WHERE Name = "${voter}"`;
//               console.log(updateSql);
//               return db.runAsync(updateSql);
//           }
//       }).then(() => {
//           return val;
//       });
//   }
