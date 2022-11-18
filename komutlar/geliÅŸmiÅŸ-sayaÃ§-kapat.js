const Discord = require('discord.js');
var db = require('saver.db')
exports.run = (client, message, args) => {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Yetersiz yetki.");
var syg = message.mentions.channels.first()
db.delete(`gelişmiş-sayaç_${message.guild.id}`, syg)
message.channel.send("Gelişmiş Sayaç Kapatıldı!")
};

exports.conf = {
  aliases: ['gelişmiş-sayaç', 'gelişmiş-sayaç-kapa'],
  permLevel: 0,
  kategori: 'Moderatör'
};

exports.help = {
  name: 'gelişmiş-sayaç-kapat'
};