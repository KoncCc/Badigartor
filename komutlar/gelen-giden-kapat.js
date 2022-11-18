const Discord = require('discord.js');
var db = require('saver.db')
exports.run = (client, message, args) => {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Yetersiz yetki.");
var asd = message.mentions.channels.first()
db.delete(`hgbb_${message.guild.id}`, asd)
message.channel.send("Kapatıldı!")
};

exports.conf = {
  aliases: [],
  permLevel: 0,
  kategori: 'Moderatör'
};

exports.help = {
  name: 'gelen-giden-kapat'
};