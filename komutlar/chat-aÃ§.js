const Discord = require("discord.js");
exports.run = (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
 message.channel.createOverwrite(every, {
    SEND_MESSAGES: null
  });

  message.channel.send("Sohbet kanalı ``Yazılabilir`` durumuna getirildi.");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["chat-aç"],
  kategori: "Moderasyon",
  permLevel: 0
};

exports.help = {
  name: "chat-aç",
  description: "Chatinizi kapatmaya yarar.",
  usage: "kapat"
};