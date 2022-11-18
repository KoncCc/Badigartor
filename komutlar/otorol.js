const {MessageEmbed} = require('discord.js')
const db = require('saver.db')

exports.run = async (client, message, args) => {
  
  let rol = message.mentions.roles.first();
  let kanal = message.mentions.channels.first();
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Bu Komutu Kullanabilmek İçin `Sunucuyu Yönet` Yetkisine Sahip Olmalısın!**");
  
  if (!rol) return message.reply('**Lütfen Otorol Sonucunda Verilecek Bir Rol Etiketleyin!**')
  if (!kanal) return message.reply('**Lütfen Otorol Sonucunda Rolün Verildi Yazısı İçin Bir Kanal Etiketleyin! `Örnek bg!oto-rol @ROL #KANAL!`**')
  
    let kontrol = db.fetch(`otoR_${message.guild.id}`)
    if(kontrol) return message.channel.send('**Oto Rol Zaten Ayarlı! Kapatmak İçin `bg!oto-rol-kapat` Yazınız!**')
  
  db.set(`otoR_${message.guild.id}`, rol.id);
  db.set(`otoK_${message.guild.id}`, kanal.id);
  
  message.channel.send(`**Oto Rol \`${rol.name}\` Kanalı ${kanal} Olarak Ayarlandı!**`)
  db.set(`otorol_${message.guild.id}`, message.guild.id);
  message.channel.send(`
****Önemli Not! : Oto Rol Vermem İçin Rolüm Rollerin En Üstünde Olmalı Yoksa Çalışmam :)**`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oto-rol"],
  permLevel: 0
}
exports.help = {
  name: "otorol"
}