const discord = require('discord.js')
const db = require("saver.db");

exports.run = async(client, message, args) => {
    if(message.author.id !== message.guild.owner.user.id) return message.reply('**Bu Komutu Sadece `Sunucu Sahibi` Kullanabilir!**')
    const herşeyibenmisöyleyeyim = new discord.MessageEmbed()
    .setTitle('**BadiGart Bot Hata!**')
    .setDescription("**Lütfen Bir Seçenek Belirtiniz!**")
if(!args[0]) return message.channel.send(herşeyibenmisöyleyeyim)
    let kontrol = db.fetch(`banlimit_${message.guild.id}`)
    if(kontrol) return message.channel.send('**Ban Limit Zaten Ayarlı!**')
    if(!kontrol) {
let engin = args[0]
const embed = new discord.MessageEmbed()
.setTitle('**BadiGart Bot Hata!**')
.setDescription('**Lütfen Ban Limiti Belirleyiniz!**')
if(!engin) return message.channel.send(embed)
db.set(`banlimit_${message.guild.id}`, Number(engin))
const embedd = new discord.MessageEmbed()
.setTitle('**Ban Limit Ayarlandı!**')
.setDescription(`**Ban Limit Başarı İle **${engin}** Olarak Ayarlandı!**`)
return message.channel.send(embedd)
    }
}
exports.conf = {
enabled: true,
guildOnly: true,
permLevel: 0,
aliases: ["banlimit"]
}
exports.help = {
name: "ban-limit"
}