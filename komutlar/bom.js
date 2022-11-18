const Discord = require('discord.js');

exports.run = (client, message, args) => {
if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply('**Bu Komutu Sadece `Kanalları Yönet` Yetkisine Sahip Şahıslar Kullanabilir!**')
message.channel.clone().then(knl => {
  let position = message.channel.position;
  knl.setPosition(position);
  message.channel.delete();
});
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["nuke","nuk","nk"],
  permLevel: 0
};

exports.help = {
    name: 'bom',
  description: 'belirtilen kanalı siler tekrar oluşturur.',
  usage: 'nuke'
};