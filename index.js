const Discord = require('discord.js');
const bot = new Discord.Client();

//test
const token = 'NjQwMjgzNjEwNDU2NTIyNzUy.Xb3qvQ.aVNwLMqlN_Pb3FHFjy__z_S1AQw
';

bot.on('ready', ()=>{
  console.log("This bot is online!");  
})

bot.on('message', msg=>{
    if (msg.content==="slut"){
        msg.reply('you know it lol');
    }
})

bot.login(token);