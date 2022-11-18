const Discord = require("discord.js");
exports.run = async (client, message, args) => {

  
let istek = args.slice(0).join(' ')
if(!istek) return message.reply('**:x: Talep Oluşturmak için ``bg!destek (TALEBİNİZİ)``Yazınız!**').then(message => message.delete({ timeout: 10000 }));

const embed = new Discord.MessageEmbed()
.setTitle("BadiGart Destek")
.setColor('BLUE')
.setDescription(`**Kanal : ${message.channel.name} - \`(${message.channel.id})\` \n Sunucu : ${message.guild.name} - \`(${message.guild.id})\` \n Kullanıcı : <@${message.author.id}> - \`(@${message.author.tag})\` \n \n Talep : \`${istek}\` - \`(${message.id})\`**`)
client.channels.cache.get('964959295907172362').send(embed)

message.channel.send("**:white_check_mark: Talebiniz Başarıyla Gönderildi!**").then(message => message.delete({ timeout: 5000 }));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["talep"],
  permLevel: 0  
};

exports.help = {
  name: 'destek',
  description: 'İstek kodları belirtmeye yarar',
  usage: 'istek-kod <istek>'
}