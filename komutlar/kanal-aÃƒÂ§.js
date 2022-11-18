const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let kanal = args.slice(0).join(' ');
    let guild = message.guild;
    if (kanal.length < 1) return message.reply('Lütfen Oluşturacağım Kanalın Adını Yaz.!!');
  message.delete();
  guild.channels.create(kanal, 'text');
  message.channel.send("**Yazı Kanalı Oluşturuldu!**");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yazı-kanal-aç', "yka", "metin-kanalı-aç"],
  permLevel: 0
};

exports.help = {
  name: 'yazı-kanal-aç',
  description: 'Bir ses kanalı açar',
  usage: 'yazı-kanal-aç [açmak istediğiniz kanalın adı]'
}; 