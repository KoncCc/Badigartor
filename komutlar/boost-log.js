const Discord = require('discord.js');
const db = require('saver.db')

exports.run = async (client, message, args) => {
let engin = message.mentions.channels.first()
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Bu Komutu Kullanabilmek İçin `Sunucuyu Yönet` Yetkisine Sahip Olmalısın!**");
if(!engin) return message.channel.send('**Lütfen Boost Log Kanalını Belirtiniz!**')
db.set(`boostlog_${message.guild.id}`, engin.id)
const embed = new Discord.MessageEmbed()
.setTitle('**Boost Log Başarıyla Ayarlandı!**')
.setDescription(`**Boost Log Kanalı <#${engin.id}> Olarak Ayarlandı!**`)
return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'boost-log'
};