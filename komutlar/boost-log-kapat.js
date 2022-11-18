const {MessageEmbed} = require('discord.js')
const db = require('saver.db')
exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Bu Komutu Kullanabilmek İçin `Sunucuyu Yönet` Yetkisine Sahip Olmalısın!**");

db.delete(`boostlog_${message.guild.id}`)
  
  message.channel.send(`**Boost Log Başarıyla Kapatıldı!**`)
  db.delete(`otorol_${message.guild.id}`);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["boost-log-kapat"],
  permLevel: 0
}
exports.help = {
  name: "boostlogkapat"
}