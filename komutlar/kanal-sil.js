const Discord = require("discord.js");
exports.run = (client, message, args) => {
  
    message.channel.send('__**YETKİ KONTROLÜ YAPILIYOR...**__');
    if(message.author.id !== message.guild.owner.user.id) return message.reply('**Bu Komutu Sadece `Sunucu Sahibi` Kullanabilir!**')
    message.channel.send('**Bu Sunucuda Kurucu Olduğun İçin İşlem Başlatıldı ✅**');
    message.channel.send('**Kanalın Yanlışlıkla Silinmesi Botun Suçu Değildir !**');
    message.channel.send('**Bu İşlem Geri Alınamaz !**');
    message.channel.send('**Tüm Kanallar **__7 SANİYE__** İçinde Silinecektir !**').then(message => {
    setTimeout(function () {
message.guild.channels.cache.forEach(x => x.delete({reason: null}));
    },1 * 7000)
  })
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "sohbet",
  permLevel: 0
};

exports.help = {
  name: "kanalları-sil",
  description: "Sohbetinizi kapatmaya yarar.",
  usage: "kapat"
};