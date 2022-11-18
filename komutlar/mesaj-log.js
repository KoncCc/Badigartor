const Discord = require('discord.js');
const db = require("saver.db");

exports.run = async(client, message, args) => {
    let enginar = message.mentions.channels.first()
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("**Bu Komutu Kullanabilmek İçin `Sunucuyu Yönet` Yetkisine Sahip Olmalısın!**");
    if(!enginar) return message.channel.send('**Lütfen Mesaj Log Kanalını Belirt!**')
    db.set(`mesajlog_${message.guild.id}`, enginar.id)
    return message.channel.send(`**Mesaj Log Kanalı Başarı İle <#${enginar.id}> Olarak Ayarlandı!**`)

};


exports.conf = {
enabled: true, 
guildOnly: false,
aliases: ["mesajlog"],
permLevel: 0


};
exports.help = {
    name : "mesaj-log"
};