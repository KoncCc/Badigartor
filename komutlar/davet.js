const Discord = require('discord.js');

exports.run = async (client, message, args) => {

message.channel.send(new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png')
.setDescription(`**>>> ${client.user} Kullanırken \`@${client.user.username}\` Rolünü En Yukarıda Tutunuz! \`YOKSA ÇALIŞMAZ!\`

Davet Linki: [Buraya Tıkla](https://discord.com/oauth2/authorize?client_id=853373283373940756&permissions=8&scope=bot)
\`\`\`Sunucunuza Eklemeniz Sizin Yararınıza Olacaktır!\`\`\`

Destek Sunucusu: [Buraya Tıkla](https://discord.gg/KWbWFgN2hY)
\`\`\`Sorularınız İçin Destek Sunucusuna Gelebilirsiniz!\`\`\`**`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'davet'
};