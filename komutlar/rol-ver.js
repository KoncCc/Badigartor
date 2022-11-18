const Discord = require('discord.js');
exports.run = (client, message, args) => {
  
  if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komutu sadece `Sunucu Sahibi` kullanabilir!')
  if (!message.guild) {
  
  const ozelmesajuyari = new Discord.MessageEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL())
  .addField('⚠️ **Uyarı** ⚠️', '`rol-ver` **adlı komutu özel mesajlarda kullanamazsın.**')
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let rol = message.mentions.roles.first()  
  let user = message.mentions.members.first() 

  if (!user) return message.reply('**Kime Rol Verceğimi Yazmadın!**').catch(console.error);
  if (rol.length < 1) return message.reply('**Rolü Belirtmedin!**');
user.roles.add(rol);

message.channel.send(`**Rölü Başarıyla Verildi!**`)
  
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'rol-ver',
  description: 'İstediğiniz kişiyi istediğiniz rolü verir.',
  usage: 'rol-ver [kullanıcı] [@rol]'
};