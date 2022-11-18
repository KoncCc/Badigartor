const Discord = require('discord.js');
var db = require('saver.db')
exports.run = (client, message, args) => {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Bu Komutu Kullanabilmek İçin `Sunucuyu Yönet` Yetkisine Sahip Olmalısın!**");
var syy = message.mentions.channels.first()
db.delete(`sayaç_${message.guild.id}`, syy)
message.channel.send("**Sayaç Başarıyla Kapatıldı!**")
};

exports.conf = {
  aliases: ['sayaç', 'sayaç-kapa'],
  permLevel: 0,
  kategori: 'Moderatör'
};

exports.help = {
  name: 'sayaç-kapat'
};