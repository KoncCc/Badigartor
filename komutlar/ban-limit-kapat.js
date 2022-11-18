const {MessageEmbed} = require('discord.js')
const db = require('saver.db')

exports.run = async (client, message, args) => {
  
  if(message.author.id !== message.guild.owner.user.id) return message.reply('**Bu Komutu Sadece `Sunucu Sahibi` Kullanabilir!**')

    let kontrol = db.fetch(`banlimit_${message.guild.id}`)
    if(!kontrol) return message.channel.send('**Sistem Ayarlı Değil!**')
    db.delete(`banlimit_${message.guild.id}`)
    return message.channel.send('**Ban Limit Kapatıldı!**')
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["banlimitkapat"],
  permLevel: 0
}
exports.help = {
  name: "ban-limit-kapat"
}