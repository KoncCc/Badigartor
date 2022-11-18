const Discord = require("discord.js");

exports.run = (client, message) => {

const FwhyCode = Math.floor(Math.random() * 100) + 1;

return message.channel.send(`**BadiGart Bot** \n**Efkarınız:** **%${FwhyCode}** **Efkar** `);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["efkar"],
  permLevel: 0
};

exports.help = {
  name: "efkarım",
  description: "x_REDDAWN_x | Efkarınızı ölçer",
  usage: "efkar Ölçer"
};
