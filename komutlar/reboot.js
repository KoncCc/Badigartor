const Discord = require('discord.js');

exports.run = async (client, message, args) => {
if(message.author.id !== '728300959842828358') return message.channel.send('**Bu Komutu Sadece `Bot Sahibi` Kullanabilir!**');
message.delete();
message.channel.send("**BadiGart Bot | :zap: Restart Başarılı! :zap:**")
  
.then((collected) => {
console.log(`! ! ! Restart ! ! !`);
process.exit(0);
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r","re"],
  permLevel: 0
};

exports.help = {
  name: 'restart',
  description: 'Botu Yeniden Başlatır.',
  usage: 'reboot'
};