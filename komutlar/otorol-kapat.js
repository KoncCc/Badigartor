const {MessageEmbed} = require('discord.js')
const db = require('saver.db')
exports.run = async (client, message, args) => {
  let rol = await db.fetch(`otoR_${message.guild.id}`);
  let kanal = await db.fetch(`otoK_${message.guild.id}`);
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Bu Komutu Kullanabilmek İçin `Sunucuyu Yönet` Yetkisine Sahip Olmalısın!**");

  db.delete(`otoR_${message.guild.id}`, rol.id);
  db.delete(`otoK_${message.guild.id}`, kanal.id);
  
  message.channel.send(`**Otorol Başarıyla Kapatıldı!**`)
  db.delete(`otorol_${message.guild.id}`);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oto-rol-kapat", "bot-rol-kapat", "bot-kapat", "bot-oto-rol-kapat", "bototo-rol-kapat", "bototorol-kapat", "bototorolkapat"],
  permLevel: 0
}
exports.help = {
  name: "otorolkapat"
}