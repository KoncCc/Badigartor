const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
 if (args[0] === "sil"){
    if (!args[1])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(
            `**Lütfen Bir Hazne Belirtin! Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**`
          )
      );
    if (args[1] === "1") {
      if (db.has(`not1_${message.author.id}`)) {
        db.delete(`not1_${message.author.id}`);
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**1 . Haznedeki Notunuz Silindi!**")
        );
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Zaten 1 . Hazneye Not Kaydedilmemiş!**")
        );
    }
  if(args[1] === "2"){
    if (db.has(`not2_${message.author.id}`)) {
        db.delete(`not2_${message.author.id}`);
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**2 . Haznedeki Notunuz Silindi!**")
        );
     } else
        return message.channel.send(
          new Discord.MessageEmbed()
           .setColor("BLACK")
            .setDescription("**Zaten 2 . Hazneye Not Kaydedilmemiş!**")
        );
  }
  
  if(args[1] === "3"){
        if (db.has(`not3_${message.author.id}`)) {
        db.delete(`not3_${message.author.id}`);
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**3 . Haznedeki Notunuz Silindi!**")
        );
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Zaten 3 . Hazneye Not Kaydedilmemiş!**")
        );
  }
  if(args[1] === "4"){
          if (db.has(`not4_${message.author.id}`)) {
        db.delete(`not4_${message.author.id}`);
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**4 . Haznedeki Notunuz Silindi!**")
        );
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Zaten 4 . Hazneye Not Kaydedilmemiş!**")
        );
  }
    if(args[1] === "5"){
                if (db.has(`not5_${message.author.id}`)) {
        db.delete(`not5_${message.author.id}`);
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**5 . Haznedeki Notunuz Silindi!**")
        );
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Zaten 5 . Hazneye Not Kaydedilmemiş!**")
        );
        }
    if(args[1] === "6"){
                      if (db.has(`not6_${message.author.id}`)) {
        db.delete(`not6_${message.author.id}`);
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**6 . Haznedeki Notunuz Silindi!**")
        );
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Zaten 6 . Hazneye Not Kaydedilmemiş!**")
        );
    }
    if(args[1] === "7"){
                            if (db.has(`not7_${message.author.id}`)) {
        db.delete(`not7_${message.author.id}`);
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**7 . Haznedeki Notunuz Silindi!**")
        );
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Zaten 7 . Hazneye Not Kaydedilmemiş!**")
        );
    }
  if(args[1] === "8"){
if (db.has(`not8_${message.author.id}`)) {
        db.delete(`not8_${message.author.id}`);
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**8 . Haznedeki Notunuz Silindi!**")
        );
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Zaten 8 . Hazneye Not Kaydedilmemiş!**")
        );
  }
  if(args[1] === "9"){
   if (db.has(`not9_${message.author.id}`)) {
        db.delete(`not9_${message.author.id}`);
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**9 . Haznedeki Notunuz Silindi!**")
        );
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Zaten 9 . Hazneye Not Kaydedilmemiş!**")
        ); 
  } 
 if(args[1] === "10"){
       if (db.has(`not10_${message.author.id}`)) {
        db.delete(`not10_${message.author.id}`);
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**10 . Haznedeki Notunuz Silindi!**")
        );
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Zaten 10 . Hazneye Not Kaydedilmemiş!**")
        ); 
 }
 }
}
exports.conf = {
aliases: [],
permLevel: 0
};
exports.help = {
  name: ".not-sil.",
  description: "",
  usage: "(prefix)not yardım"
};