const Discord = require('discord.js');
var db = require('saver.db')
exports.run = (client, message, args) => {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Yetersiz Yetki!**");
let kanal = message.mentions.channels.first();
var syg = message.mentions.channels.first()
let kontrol = db.fetch(`gelişmiş-sayaç_${message.guild.id}`)
if(kontrol) return message.channel.send('**Gelişmiş Sayaç Zaten Ayarlı! Kapatmak İçin `bg!gelişmiş-sayaç-kapat` Yazınız!***')
if(!syg) return message.channel.send("kanal belirt")
db.set(`gelişmiş-sayaç_${message.guild.id}`, syg.id)
message.channel.send(`**Sayaç Kanalı ${kanal} Olarak Ayarlandı!**`)
};

exports.conf = {
  aliases: ['gelişmiş-sayaç', 'gelişmiş-sayaç-aç'],
  permLevel: 0,
  kategori: 'Moderatör'
};

exports.help = {
  name: 'gelişmiş-sayaç'
};