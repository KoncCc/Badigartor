const Discord = require('discord.js');
var db = require('saver.db')
exports.run = (client, message, args) => {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Yetersiz yetki.**");
let kanal = message.mentions.channels.first();
var asd = message.mentions.channels.first()
let kontrol = db.fetch(`hgbb_${message.guild.id}`)
if(kontrol) return message.channel.send('**Gelen Giden Zaten Ayarlı! Kapatmak İçin `bg!gelen-giden-kapat` Yazınız!**')
if(!asd) return message.channel.send("kanal belirt")
db.set(`hgbb_${message.guild.id}`, asd.id)
message.channel.send(`**Gelen, Giden Kanalı ${kanal} Olarak Ayarlandı!**`)
};

exports.conf = {
  aliases: ["hg-bb"],
  permLevel: 0,
  kategori: 'Moderatör'
};

exports.help = {
  name: 'gelen-giden'
};