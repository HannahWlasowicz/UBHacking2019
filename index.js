const Discord = require('discord.js');
const bot = new Discord.Client();

//test
const token = 'NjQwMjgzNjEwNDU2NTIyNzUy.Xb3qvQ.aVNwLMqlN_Pb3FHFjy__z_S1AQw';
const PREFIX = '!';

bot.on('ready',()=>{
  console.log('This bot is online!')
})

bot.on('message', message=>{
    let args  = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
       case 'ping':
        message.channel.sendMessage('pong!');
        break;
      case 'website':
        message.channel.sendMessage('twitch.tv/akaarie');
        break;
    }
})

bot.login(token);
