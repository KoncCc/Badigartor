const {MessageEmbed} = require('discord.js')
const db = require('saver.db')
exports.run = async (client, message, args) => {
  let kanal = await db.fetch(`güvenlik_${message.guild.id}`);
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Yetersiz Yetki!**");

  db.delete(`güvenlik_${message.guild.id}`, kanal.id);
  
  message.channel.send(`**Güvenlik Başarıyla Kapatıldı!**`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["güvenlik-kapat"],
  permLevel: 0
}
exports.help = {
  name: "güvenlikkapat"
}