const {MessageEmbed} = require('discord.js')
const db = require('saver.db')
exports.run = async (client, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.reply('**Bu Komutu Sadece `Sunucu Sahibi` Kullanabilir!**')
 
  let enginar = message.mentions.channels.first()
  db.delete(`mesajlog_${message.guild.id}`, enginar.id);
  
  message.channel.send(`**Mesaj Log Başarıyla Kapatıldı!**`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mesaj-log-kapat", "mesajkapat", "mesaj-kapat"],
  permLevel: 0
}
exports.help = {
  name: "mesajlogkapat"
}