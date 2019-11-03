const Discord = require('discord.js');
const bot = new Discord.Client();
const async = require('async');
//test
const token = 'NjQwMjgzNjEwNDU2NTIyNzUy.Xb3qvQ.aVNwLMqlN_Pb3FHFjy__z_S1AQw';
const PREFIX = '!';

bot.on('ready',()=>{
  console.log('This bot is online!');
});

bot.on('guildMemberAdd', member=>{
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;
    const rules = member.guild.channels.find(rules => rules.name === "rules")
    channel.send(`Welcome to our server, ${member}, please read the rules in the ${rules} channel! <3`)
});


bot.on('message', message=>{
    let args  = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
       case 'ping':
        message.channel.send('pong!');
        break;

      case 'website':
        message.channel.send('twitch.tv/akaarie');
        break;

      case 'info':
        if(args[1] == 'version'){
            message.channel.send('version '+ version);
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
            const embed = new Discord.RichEmbed()
            .setTitle('User Information')
            .addField('Player Name', message.author.username)
            .addField('Current Server', message.guild.name)
            .setColor(0xff9999)
            .setThumbnail(message.author.avatarURL)

            message.channel.sendEmbed(embed);
            break;

      case 'raid':
            const req = require('./main.js');
            //const invite = req.getLink;
            async.waterfall([req.getLink], () => {
              console.log(invite + "inside the index file");
              console.log("Called function");
              message.channel.send(invite + " Hello spicy people");
            })


    }
})

function invite(){

}
bot.login(token);
