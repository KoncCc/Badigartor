const discord = require('discord.js')
const db = require("quick.db");

exports.run = async(client , message, args) => {
    if(args[0] == "yetkili-rol"){
        let engin = message.mentions.roles.first()
        if(!engin) return message.channel.send('**Lütfen Jail Yetkili Rolünü Belirtin!**')
        db.set(`jailyetkili_${message.guild.id}`, engin.id)
        const embed = new discord.MessageEmbed()
        .setTitle('**Jail Yetkili Rolü Başarı İle Ayarlandı!**')
        .setDescription(`**Jail Yetkili Rolü Başarı İle <@&${engin.id}> Olarak Ayarlandı!**`)
        return message.channel.send(embed)
    }
    if(args[0] == "rol") {
        let engin = message.mentions.roles.first()
        if(!engin) return message.channel.send('**Jail Rolünü Belirttin!**')
        db.set(`jailrol_${message.guild.id}`, engin.id)
        const embed = new discord.MessageEmbed()
        .setTitle('**Jail Rolü Başarı İle Ayarlandı!**')
        .setDescription(`**Jail Rolü Başarı İle <@&${engin.id}> Olarak Ayarlandı!**`)
        return message.channel.send(embed)
    }
    if(args[0] == "log") {
        let engin = message.mentions.channels.first()
        if(!engin) return message.channel.send('**Lütfen Jail Log Kanalını Belirtin!**')
        db.set(`jaillog_${message.guild.id}`, engin.id)
        const embed = new discord.MessageEmbed()
        .setTitle('**Jail Log Kanalı Başarı İle Ayarlandı!**')
        .setDescription(`**Jail Log Kanalı Başarı İle <#${engin.id}> Olarak Ayarlandı!**`)
        return message.channel.send(embed)
    }
}
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    permLevel: 0, 
    aliases: []
    };
    exports.help = {
    name: "jail-sistem"
    };