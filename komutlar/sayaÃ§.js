const Discord = require('discord.js');
var db = require('saver.db')
exports.run = (client, message, args) => {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Bu Komutu Kullanabilmek İçin `Sunucuyu Yönet` Yetkisine Sahip Olmalısın!**");
let kanal = message.mentions.channels.first();
var syy = message.mentions.channels.first()
let kontrol = db.fetch(`sayaç_${message.guild.id}`)
if(kontrol) return message.channel.send('**Sayaç Zaten Ayarlı! Kapatmak İçin `bg!sayaç-kapat` Yazınız!**')
if(!syy) return message.channel.send("**Kanal Belirtmelisin!**")
db.set(`sayaç_${message.guild.id}`, syy.id)
message.channel.send(`**Sayaç Kanalı ${kanal} Olarak Ayarlandı!**`)
};

exports.conf = {
  aliases: ['sayaç', 'sayaç-aç'],
  permLevel: 0,
  kategori: 'Moderatör'
};

exports.help = {
  name: 'sayaç'
};