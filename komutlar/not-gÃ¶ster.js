const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
if (args[0] === "göster") {
    if (!args[1])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(
            `**Lütfen Bir Hazne Belirtin. Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**`
          )
      );
    if (args[1] === "1") {
      if (db.has(`not1_${message.author.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setTitle(`${message.author.username} 1. Hazne Not'u`)
          .setDescription(db.fetch(`**not1_${message.author.id}**`))
  
        return message.channel.send(embed);
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**1 . Haznede Notunuz Bulunmuyor!**")
        );
    }
  if(args[1] === "2"){
     if (db.has(`not2_${message.author.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setTitle(`${message.author.username} 2. Hazne Not'u`)
          .setDescription(db.fetch(`**not2_${message.author.id}**`))
        return message.channel.send(embed);
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
           .setDescription("**2 . Haznede Notunuz Bulunmuyor!**")
        );
  }
  if(args[1] === "3"){
         if (db.has(`not3_${message.author.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setTitle(`${message.author.username} 3. Hazne Not'u`)
          .setDescription(db.fetch(`**not3_${message.author.id}**`))
        return message.channel.send(embed);
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**3 . Haznede Notunuz Bulunmuyor!**")
        );
  }
  if(args[1] === "4"){
             if (db.has(`not4_${message.author.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setTitle(`${message.author.username} 4. Hazne Not'u`)
          .setDescription(db.fetch(`**not4_${message.author.id}**`))
        return message.channel.send(embed);
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**4 . Haznede Notunuz Bulunmuyor!**")
        );
  }
  if(args[1] === "5"){
                 if (db.has(`not5_${message.author.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setTitle(`${message.author.username} 5. Hazne Not'u`)
          .setDescription(db.fetch(`**not5_${message.author.id}**`))
        return message.channel.send(embed);
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**5 . Haznede Notunuz Bulunmuyor!**")
        );
  }
   if(args[1] === "6"){
                      if (db.has(`not6_${message.author.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setTitle(`${message.author.username} 6. Hazne Not'u`)
          .setDescription(db.fetch(`**not6_${message.author.id}**`))
        return message.channel.send(embed);
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**6 . Haznede Notunuz Bulunmuyor!**")
        );
   }
    if(args[1] === "7"){
  if (db.has(`not7_${message.author.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setTitle(`${message.author.username} 7. Hazne Not'u`)
          .setDescription(db.fetch(`**not7_${message.author.id}**`))
        return message.channel.send(embed);
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**7 . Haznede Notunuz Bulunmuyor!**")
        );
    }
   if(args[1] === "8"){
if (db.has(`not8_${message.author.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setTitle(`${message.author.username} 8. Hazne Not'u`)
          .setDescription(db.fetch(`**not8_${message.author.id}**`))
        return message.channel.send(embed);
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**8 . Haznede Notunuz Bulunmuyor!**")
        );
   } 
 if(args[1] === "9"){
  if (db.has(`not9_${message.author.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setTitle(`${message.author.username} 9. Hazne Not'u`)
          .setDescription(db.fetch(`**not9_${message.author.id}**`))
        return message.channel.send(embed);
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**9 . Haznede Notunuz Bulunmuyor!**")
        ); 
 }  
  if(args[1] === "10"){
      if (db.has(`not10_${message.author.id}`)) {
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setTitle(`${message.author.username} 10. Hazne Not'u`)
          .setDescription(db.fetch(`**not10_${message.author.id}**`))
        return message.channel.send(embed);
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**10 . Haznede Notunuz Bulunmuyor!**")
        ); 
  }
  }
};

exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "not",
  description: "",
  usage: "(prefix)not yardım"
};