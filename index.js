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
      case 'info':
        if(args[1] == 'version'){
            message.channel.sendMessage('version '+ version);
        }
        else{
            message.channel.sendMessage('invalid args');
        }
        break;
      case 'clear':
        if(!args[1]) return message.reply('Error; please define second arg')
        message.channel.bulkDelete(args[1]);
        break;
    }
})

bot.login(token);
