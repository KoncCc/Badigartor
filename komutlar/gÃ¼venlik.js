const {MessageEmbed} = require('discord.js')
const db = require('saver.db')

exports.run = async (client, message, args) => {
  
  let rol = message.mentions.roles.first();
  let kanal = message.mentions.channels.first();
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Yetersiz Yetki!**");
  
  if (!kanal) return message.reply('**Lütfen Mesajın Gönderileceği Bir Kanal Etiketleyin!**')
  
  db.set(`güvenlik_${message.guild.id}`, kanal.id);
  
  message.channel.send(`**Güvenlik Kanalı ${kanal} Olarak Ayarlandı!**`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["güven"],
  permLevel: 0
}
exports.help = {
  name: "güvenlik"
}