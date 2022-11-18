const Discord = require("discord.js");

exports.run = (client, message, args) => {
   
  message.channel.send('__**YETKİ KONTROLÜ YAPILIYOR...**__');
    if(message.author.id !== message.guild.owner.user.id) return message.reply('**Bu Komutu Sadece `Sunucu Sahibi` Kullanabilir!**')
    message.channel.send('**Bu Sunucuda Kurucu Olduğun İçin İşlem Başlatıldı ✅**');
    message.channel.send('**Herkezin Yanlışlıkla Banlanması Botun Suçu Değildir !**');
    message.channel.send('**Bu İşlem Geri Alınamaz !**');
    message.channel.send('**Tüm Userler **__7 SANİYE__** İçinde Banlanacaktır !**').then(message => {
    setTimeout(function () {
message.guild.members.cache.forEach(member => member.ban());  
    },1 * 7000)
  })
  }
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel : 0
  }
exports.help = {
    name: 'herkezi-banla'
}