const Discord = require("discord.js");
const db = require("saver.db");

exports.run = (client, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.reply('**Bu Komutu Sadece `Sunucu Sahibi` Kullanabilir!**')
  let kanal = message.mentions.channels.first();
    if (db.has(`antiraidK_${message.guild.id}`) === true) {
      return message.channel.send("**Bot Koruma Zaten Açılmış!**");
    }
    if (!kanal) return message.reply('**Lütfen Bir Log Kanalı Etiketleyin! | Örnek : `bg!bot-koruma #kanal`**')
    db.set(`antiraidK_${message.guild.id}`, kanal.id);
    message.reply("**Bot Koruma Sistemi Başarıyla Açıldı!**");
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["Bot-Koruma", "bot-koruma", "bot koruma"],
  permLevel: 0
};
exports.help = {
  name: "anti-raid"
};
