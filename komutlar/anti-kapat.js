const Discord = require("discord.js");
const db = require("saver.db");

exports.run = async (client, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.reply('**Bu Komutu Sadece `Sunucu Sahibi` Kullanabilir!**')
  let kanal = await db.fetch(`antiraidL_${message.guild.id}`);
  
    if (db.has(`antiraidK_${message.guild.id}`) === false) {
      return message.channel.send(
        "**Bot Koruma Açılmamış! Açmak için bg!Bot-Koruma #kanal**"
      );
    }
    db.delete(`antiraidK_${message.guild.id}`);
    message.reply("**Bot Koruma Sistemi Başarıyla Kapatıldı!**");
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["Bot-Koruma-Kapat", "bot-koruma-kapat", "bot koruma kapat"],
  permLevel: 0
};
exports.help = {
  name: "anti-raid-kapat"
};
