const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
var p = "bg!"
   if (args[0] === "ekle")
   if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`**Lütfen Bir Komut Belirtin. Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**`)
    );
   {
    if (!args[1])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(
            `**Lütfen Bir Hazne Belirtin. Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**`
          )
      );
    if (args[1] === "1") {
      var text = args.slice(2).join(" ");
      if (!text)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription(
              `**Lütfen Bir Not Belirtin! Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**`
            )
        );
      if (text.length > 1800)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Not 1800 Karakterden Uzun!**")
        );
      db.set(`not1_${message.author.id}`, text);
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("**1 . Hazneye Notunuz Kaydedildi!**")
      );
    }
    if(args[1] === "2"){
     var text = args.slice(2).join(' ')
      if(!text)
        return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription(`
           **Lütfen Bir Not Belirtin Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**
          `)
        )
     if(text.length > 1800)
                return message.channel.send(
 
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Not 1800 Karakterden Uzun!**")
        );
      db.set(`not2_${message.author.id}`, text) 
            return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("**2 . Hazneye Notunuz Kaydedildi!**")
              )
    }
  if(args[1] === "3"){
          var text = args.slice(2).join(' ')
      if(!text)
        return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription(`
           **Lütfen Bir Not Belirtin Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**
          `)
        )
      if(text.length > 1800)
                return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Not 1800 Karakterden Uzun!**")
        );
      db.set(`not3_${message.author.id}`, text) 
            return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("**3 . Hazneye Notunuz Kaydedildi!**")
              )
  }
  if(args[1] === "4"){
             var text = args.slice(2).join(' ')
      if(!text)
        return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription(`
           **Lütfen Bir Not Belirtin Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**
          `)
        )
      if(text.length > 1800)
              return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Not 1800 Karakterden Uzun!**")
        );
    db.set(`not4_${message.author.id}`, text) 
            return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("**4 . Hazneye Notunuz Kaydedildi!**")
              )
  }
 if(args[1] === "5"){
                var text = args.slice(2).join(' ')
      if(!text)
        return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription(`
           **Lütfen Bir Not Belirtin Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**
          `)
        )
      if(text.length > 1800)
                return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Not 1800 Karakterden Uzun!**")
        );
      db.set(`not5_${message.author.id}`, text) 
    return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("**5 . Hazneye Notunuz Kaydedildi!**")
              )
  } 
  if(args[1] === "6"){
                     var text = args.slice(2).join(' ')
      if(!text)
        return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription(`
           **Lütfen Bir Not Belirtin Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**
          `)
        )
      if(text.length > 1800)
                return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Not 1800 Karakterden Uzun!**")
        );
      db.set(`not6_${message.author.id}`, text) 
    return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("**6 . Hazneye Notunuz Kaydedildi!**")
              )
  }
    if(args[1] === "7"){
                           var text = args.slice(2).join(' ')
      if(!text)
        return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription(`
           **Lütfen Bir Not Belirtin Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**
          `)
        )
     if(text.length > 1800)
                return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Not 1800 Karakterden Uzun!**")
        );
      db.set(`not7_${message.author.id}`, text) 
    return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("7 . hazneye notunuz kaydedildi!")
              )
    }
   if(args[1] === "8"){
 var text = args.slice(2).join(' ')
      if(!text)
        return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription(`
           **Lütfen Bir Not Belirtin Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**
          `)
        )
      if(text.length > 1800)
                return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Not 1800 Karakterden Uzun!**")
        );
      db.set(`not8_${message.author.id}`, text) 
    return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("**8 . Hazneye Notunuz Kaydedildi!**")
              )
   }
  if(args[1] === "9"){
     var text = args.slice(2).join(' ')
      if(!text)
        return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription(`
           **Lütfen Bir Not Belirtin Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**
          `)
        )
      if(text.length > 1800)
                return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Not 1800 Karakterden Uzun!**")
        );
      db.set(`not9_${message.author.id}`, text) 
    return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("**9 . Hazneye Notunuz Kaydedildi!**")
              )
  }
   if(args[1] === "10"){
      var text = args.slice(2).join(' ')
      if(!text)
        return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('BLACK')
          .setDescription(`
           **Lütfen Bir Not Belirtin Eğer Not Haznelerinin Kullanımını Bilmiyorsanız bg!not-yardım**
          `)
        )
      if(text.length > 1800)
                return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription("**Not 1800 Karakterden Uzun!**")
        );
      db.set(`not10_${message.author.id}`, text) 
    return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription("**10 . Hazneye Notunuz Kaydedildi!**")
              );
   } 
  }
   }

exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "not",
  description: "",
  usage: "(prefix)not yardım"
};