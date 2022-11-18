const {MessageEmbed} = require('discord.js')
const db = require('saver.db')

exports.run = async (client, message, args) => {
  
  let rolb = message.mentions.roles.first();
  let kanalb = message.mentions.channels.first();
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Bu Komutu Kullanabilmek İçin `Sunucuyu Yönet` Yetkisine Sahip Olmalısın!**");
  
  if (!rolb) return message.reply('**Lütfen Oto `BOT` Rol Sonucunda Verilecek Bir Rol Etiketleyin! `Örnek bg!oto-rol @ROL #KANAL!`**')
  if (!kanalb) return message.reply('**Lütfen Oto `BOT` Rol Sonucunda Rolün Verildi Yazısı İçin Bir Kanal Etiketleyin! `Örnek bg!oto-bot-rol @ROL #KANAL!`**')
  
    let kontrolb = db.fetch(`otoRB_${message.guild.id}`)
    if(kontrolb) return message.channel.send('**Oto `BOT` Rol Zaten Ayarlı! Kapatmak İçin `bg!oto-bot-rol-kapat` Yazınız!**')
  
  db.set(`otoRB_${message.guild.id}`, rolb.id);
  db.set(`otoKB_${message.guild.id}`, kanalb.id);
  
  message.channel.send(`**Oto \`BOT\` Rol \`${rolb.name}\` Kanalı ${kanalb} Olarak Ayarlandı!**`)
  db.set(`otorolB_${message.guild.id}`, message.guild.id);
  message.channel.send('**Önemli Not! : Oto `BOT` Rol Vermem İçin Rolüm Rollerin En Üstünde Olmalı Yoksa Çalışmam :)**')
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oto-rol-bot", "otorol-bot", "bot-oto-rol", "bototo-rol", "bototorol", "oto-bot-rol", "otobot-rol", "otobotrol"],
  permLevel: 0
}
exports.help = {
  name: "otorolbot"
}