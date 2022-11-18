const Discord = require("discord.js");

exports.run = (client, message, args) => {
  var kisi =
    message.mentions.users.first() ||
    client.users.resolve(args[0]) ||
    client.users.cache.find(u => u.username === args[0]) ||
    client.users.cache.get(args[0]);

  if (!kisi)
    return message.channel.send("Lütfen mesaj atacağım kişiyi belirtiniz.");
  let mesaj = args.slice(1).join(" ");

  if (mesaj.length < 1)
    return message.reply("Yazmam için herhangi bir şey yazmalısın.");
  message.delete();
  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  member.send(mesaj);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [".dmat"],
  permLevel: 0
};

exports.help = {
  name: ".dmat",
  description: ".",
  usage: ".dmat [kişi] [yazdırmak istediğiniz şey]"
}; 
