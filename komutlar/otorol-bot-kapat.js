const {MessageEmbed} = require('discord.js')
const db = require('saver.db')
exports.run = async (client, message, args) => {
  let rol = await db.fetch(`otoRB_${message.guild.id}`);
  let kanal = await db.fetch(`otoKB_${message.guild.id}`);
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Bu Komutu Kullanabilmek İçin `Sunucuyu Yönet` Yetkisine Sahip Olmalısın!**");
  
  db.delete(`otoRB_${message.guild.id}`, rol.id);
  db.delete(`otoKB_${message.guild.id}`, kanal.id);
  
  message.channel.send(`**Oto \`BOT\` Rol Başarıyla Kapatıldı!**`)
  db.delete(`otorolb_${message.guild.id}`);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oto-rol-bot-kapat", "otorol-bot-kapat", "otorolbot-kapat", "oto-bot-rol-kapat", "otobot-rol-kapat", "otobotrol-kapat"],
  permLevel: 0
}
exports.help = {
  name: "otorolbotkapat"
}