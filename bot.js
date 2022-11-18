const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js')
const client = new Discord.Client({ disableMentions: 'everyone' });
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
var db = require('saver.db')

// Yeni

const logs = require('discord-logs');
logs(client);

const chalk = require('chalk');
var Jimp = require('jimp');
const weather = require('weather-js')
const http = require('http');
const express = require('express');
require('./util/eventLoader')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();

// Bot

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen Komut : [ = = = ${props.help.name} = = = ]`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on('ready', () => {

  // Oynuyor Kısmı
  
      var actvs = [
        `${prefix}yardım ${client.guilds.cache.size} sunucuyu`,
        `${prefix}yardım ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcıyı`, 
        `${prefix}yardım`
    ];
    
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING'});
    }, 15000);
    
  
      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`);
      console.log (`Prefix             : ${ayarlar.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
    
    });



client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 14;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 1;
  if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 4;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 5;
  if (message.member.hasPermission("MANAGE_ROLES")) permlvl = 6;
  
  if (message.member.hasPermission("MANAGE_NICKNAMES")) permlvl = 7;
  if (message.member.hasPermission("MANAGE_EMOJIS")) permlvl = 8;
  if (message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 9;
  if (message.member.hasPermission("MANAGE_WEBHOOKS")) permlvl = 10;
  if (message.member.hasPermission("VIEW_AUDIT_LOG")) permlvl = 11;
  
  if (message.author.id === ayarlar.sahip) permlvl = 12;
  if (message.author.id === ayarlar.OwNeR) permlvl = 13;
  return permlvl;
};

// Otorol

client.on('guildMemberAdd', async member => {

  if(await db.has(`otorol_${member.guild.id}`)) {

 let rol = await db.fetch(`otoR_${member.guild.id}`)
 let kanal = await db.fetch(`otoK_${member.guild.id}`)
 
 if (!rol) return
 if (!kanal) return
 
 member.roles.add(member.guild.roles.cache.get(rol))
 client.channels.cache.get(kanal).send(`**Merhaba ${member} , Başarıyla Rolün Verildi!**`)
    }
})

// HG

client.on("guildMemberAdd", async member => {
let theartistkullanici = client.users.cache.get(member.id)
  const theartisthesapkurulus = new Date().getTime()-theartistkullanici.createdAt.getTime();

  var asd = await db.fetch(`hgbb_${member.guild.id}`)
     let guild = member.guild;
       var Durum = member.user.presence.activities;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi", `Çevrimiçi`) : (Durum == "offline" ? ("Çevrimdışı", `Çevrimdışı`) : (Durum == "idle" ? ("Boşta", `Boşta`) : (Durum == "dnd" ? ("Rahatsız Etmeyin", `Rahatsız Etme`) : ("Güvenli! <a:onaylandi:882679725426901094>")))))
  const channel = member.guild.channels.cache.get(asd)
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(member.user.tag, member.user.avatarURL || member.user.avatarURL())
    .setThumbnail(member.user.avatarURL() || member.user.avatarURL())
    .setTitle(`[ **${member.user.username}** ] **${guild.name}** Adlı Sunucumuza Katıldı! ${client.emojis.cache.get("882679605192962048")}`)
    .setDescription(`**${member.guild.memberCount}** Üyeye Ulaştık!`)
    .addField("`Kullanıcı`", `${member.user.tag}`)
    .addField("`ID`", `${member.user.id}`)
    .addField("`Kuruluş`", `${moment.utc(theartistkullanici.createdAt).format('DD / MM / YYYY')}`)
    .addField("`Durum`", `${durm}`)
    .setTimestamp();
  channel.send(embed);
});
  
// BB

client.on("guildMemberRemove", async member => {
let theartistkullanici = client.users.cache.get(member.id)
  const theartisthesapkurulus = new Date().getTime()-theartistkullanici.createdAt.getTime();

    var asd = await db.fetch(`hgbb_${member.guild.id}`)
    
         let guild = member.guild;
         var Durum = member.user.presence.activities;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi", `Çevrimiçi`) : (Durum == "offline" ? ("Çevrimdışı", `Çevrimdışı`) : (Durum == "idle" ? ("Boşta", `Boşta`) : (Durum == "dnd" ? ("Rahatsız Etmeyin", `Rahatsız Etme`) : ("Güvenli! <a:onaylandi:882679725426901094>")))))
  const channel = member.guild.channels.cache.get(asd)
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setAuthor(member.user.tag, member.user.avatarURL() || member.user.avatarURL())
    .setThumbnail(member.user.avatarURL || member.user.avatarURL())
    .setTitle(`[ **${member.user.username}** ] **${guild.name}** Adlı Sunucumuzdan Ayrıldı! ${client.emojis.cache.get("882679605755007066")}`)
    .setDescription(`**${member.guild.memberCount}** Üyeye Düştük!`)
    .addField("`Kullanıcı`", `${member.user.tag}`)
    .addField("`ID`", `${member.user.id}`)
    .addField("`Kuruluş`", `${moment.utc(theartistkullanici.createdAt).format('DD / MM / YYYY')}`)
    .addField("`Durum`", `${durm}`)
    .setTimestamp();
  channel.send(embed);
});

// Sayaç

 client.on("guildMemberAdd", async member => {

  var syy = await db.fetch(`sayaç_${member.guild.id}`)
     let guild = member.guild;
       var Durum = member.user.presence.activities;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi", `Çevrimiçi`) : (Durum == "offline" ? ("Çevrimdışı", `Çevrimdışı`) : (Durum == "idle" ? ("Boşta", `Boşta`) : (Durum == "dnd" ? ("Rahatsız Etmeyin", `Rahatsız Etme`) : ("Güvenli! <a:onaylandi:882679725426901094>")))))
  const channel = member.guild.channels.cache.get(syy)
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**:arrow_up: ${member.guild.memberCount} Üyeye Ulaştık! :arrow_up:**`)
  channel.send(embed);
});

// Sayaç - Düştük

client.on("guildMemberRemove", async member => {

    var syy = await db.fetch(`sayaç_${member.guild.id}`)
    
         let guild = member.guild;
         var Durum = member.user.presence.activities;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi", `Çevrimiçi`) : (Durum == "offline" ? ("Çevrimdışı", `Çevrimdışı`) : (Durum == "idle" ? ("Boşta", `Boşta`) : (Durum == "dnd" ? ("Rahatsız Etmeyin", `Rahatsız Etme`) : ("Güvenli! <a:onaylandi:882679725426901094>")))))
  const channel = member.guild.channels.cache.get(syy)
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setDescription(`**:arrow_down: ${member.guild.memberCount} Üyeye düştük! :arrow_down:**`)
  channel.send(embed);
});

// Gelişmiş Sayaç

 client.on("guildMemberAdd", async member => {

  var syg = await db.fetch(`gelişmiş-sayaç_${member.guild.id}`)
     let guild = member.guild;
       var Durum = member.user.presence.activities;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi", `Çevrimiçi`) : (Durum == "offline" ? ("Çevrimdışı", `Çevrimdışı`) : (Durum == "idle" ? ("Boşta", `Boşta`) : (Durum == "dnd" ? ("Rahatsız Etmeyin", `Rahatsız Etme`) : ("Güvenli! <a:onaylandi:882679725426901094>")))))
  const channel = member.guild.channels.cache.get(syg)
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**<a:register:883820738451238963> | ${member.user.tag} Adlı Kullanıcı Sunucuya Katıldı! | ${member.guild.memberCount} Üyeye Ulaştık! | <a:hg:882679605192962048>**`)
  channel.send(embed);
});

// Gelişmiş Sayaç - Düştük

client.on("guildMemberRemove", async member => {

    var syg = await db.fetch(`gelişmiş-sayaç_${member.guild.id}`)
    
         let guild = member.guild;
         var Durum = member.user.presence.activities;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi", `Çevrimiçi`) : (Durum == "offline" ? ("Çevrimdışı", `Çevrimdışı`) : (Durum == "idle" ? ("Boşta", `Boşta`) : (Durum == "dnd" ? ("Rahatsız Etmeyin", `Rahatsız Etme`) : ("Güvenli! <a:onaylandi:882679725426901094>")))))
  const channel = member.guild.channels.cache.get(syg)
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setDescription(`**<a:register:883820738451238963> | ${member.user.tag} Adlı Kullanıcı Sunucudan Ayrıldı! | ${member.guild.memberCount} Üyeye Düştük! | <a:sg:882679605755007066>**`)
  channel.send(embed);
});

// Kurallar - Embed

client.on('message', message => {
  if (message.content.toLowerCase() === 'pcr') {
    const kanal = new MessageEmbed()
    
.setDescription(`
1 – Din, dil, ırk, mezhep, siyaset v.s. ayrımcılığı yapmak [1 HAFTA SUSTURMA]
2 – Bir şahısa, kuruluşa ve/veya gruba sözel bir nefret ifadesi belirtmek [1 SAAT SUSTURMA]
3 – Aşırı derecede küfürlü konuşmak [1 SAAT SUSTURMA]
4 – Kavga etmek [10 DAKİKA SUSTURMA]
5 – Spam ve/veya Flood atmak [5 DAKİKA SUSTURMA]
6 – Bir şahısın, kuruluşun ve/veya grubun ifşasını söylemek [1 SAAT SUSTURMA]
7 – Reklam yapmak [SINIRSIZ YASAKLAMA]
8 – Davet istemek [SINIRSIZ YASAKLAMA]
9 – J4J/S4S/F4F v.s. yapmak [SINIRSIZ YASAKLAMA]
10 – Dilencilik yapmak [SINIRSIZ YASAKLAMA]
11 – Dolandırıcılık yapmak [SINIRSIZ YASAKLAMA]
12 – Toksiklik yapmak [SINIRSIZ YASAKLAMA]
13 – Ticaret yapmak [2 GÜN YASAKLAMA]
14 – Herhangi bir sunucudan ve/veya bottan bahsetmek [1 SAAT SUSTURMA]
15 – Sohbet kanalları dışındaki kanallarda sohbet etmek [5 DAKİKA SUSTURMA]
16 – Uygunsuz içerikler göndermek [5 DAKİKA SUSTURMA]
17 – Bot kanalı dışındaki kanallarda komut kullanmak [1 SAAT SUSTURMA]
18 – Üyelerimize sarkıntılık yapmak [1 HAFTA YASAKLAMA]
19 – Üyeleri gereksiz yere etiketlemek [1 SAAT SUSTURMA]
20 – Rol ile susturulma cezaları kaldırıldığı için abartılı şekilde kuralları çiğnemek [1 GÜN SUSTURMA]
21 – 1 gün içinde birden fazla 1 saat susturulma cezalı kural çiğnemek [1 GÜN SUSTURMA]
22 – Arka arkaya gereksiz isimle kayıt olmak [1 GÜN SUSTURMA]
23 – Yararlı olmayan işler için yardım istemek [1 GÜN SUSTURMA]
24 – Tartışma kanallarında alakasız tartışmalar yapmak [1 GÜN SUSTURMA]
25 – Sunucudan çıkma ``[2 GÜN YASAKLAMA]``
`)
    .setColor("RGB")
    message.channel.send(kanal);
  }
});

// Davet

exports.run = async (client, message, args) => {

   message.guild.fetchInvites().then(invs => {
      let user = message.mentions.users.first() || message.author
      let personalInvites = invs.filter(i => i.inviter.id === user.id);
      let davetsayi = personalInvites.reduce((p, v) => v.uses + p, 0);
message.channel.send(`${user} - Davetinizle gelen kişi sayısı: ${davetsayi}`);
   })
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davetsayım","davetkişi","davetim"],
  permLevel: 0
};

exports.help = {
  name: 'davetlerim',
  description: 'Davetinizle gelen kişi sayısını gösterir',
  usage: 'davetlerim'
};

//Raid

client.on("guildMemberAdd", async member => {

  const bote = await db.fetch(`botkoruma_${member.guild.id}`)

    if (bote === "kapali" || bote === undefined || bote === null) {
    return;
  } else if (bote === "acik") {

    if (member.user.bot === false) return; 

    member.kick(member) 
member.guild.owner.send(new Discord.MessageEmbed().setColor("RED").setTitle("Koruma Alarmda!").setDescription(`Sunucuya bot eklendi, ama ben attım!`)) 

}
})

// Kanal-Koruma

client.on('channelDelete', async(channel) => {
  
  const data = await db.fetch(`kanalkoruma_${channel.guild.id}`)
  
if(channel.type === "text") {
   

  
if(data === 'acik') {
     let açıklama = channel.topic;
    let kategoriID = channel.parentID;
    let isim = channel.name;
    let sıra = channel.position;
    let nsfw = channel.nsfw;

        channel.guild.channels.create(channel.name, { type: 'text', position:sıra,topic:açıklama,nsfw:nsfw}).then(kanal => {
      let z = kanal.guild.channels.cache.get(kanal.id)
      z.setParent(z.guild.channels.cache.find(channel => channel.id === kategoriID))
     })
}
}

if(data === 'kapali') {

}
})

// Yardım

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!yardım') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
**<a:gnl:891354902356439050> Bg!Kullanıcı**
**<a:gnl:891354902356439050> Bg!Sunucu**
**<a:gnl:891354902356439050> Bg!Moderasyon**
**<a:gnl:891354902356439050> Bg!Koruma**
**<a:gnl:891354902356439050> Bg!Ekonomi**
**<a:gnl:891354902356439050> Bg!Eğlence**
**<a:gnl:891354902356439050> Bg!Bot**
`)
    .setAuthor('BadiGart Bot / Yardım')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Help

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!help') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
**:white_small_square: ${ayarlar.prefix}Kullanıcı**
**:white_small_square: ${ayarlar.prefix}Sunucu**
**:white_small_square: ${ayarlar.prefix}Moderasyon**
**:white_small_square: ${ayarlar.prefix}Bot**
`)
    .setAuthor('BadiGart Bot / Yardım')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Yardım Kullanıcı

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!kullanıcı') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**➤ ${ayarlar.prefix}avatar**
**➤ ${ayarlar.prefix}emojiler**
**➤ ${ayarlar.prefix}mcskin**
**➤ ${ayarlar.prefix}sunucu-bilgi**
**➤ ${ayarlar.prefix}sunucu-resmi**
**➤ ${ayarlar.prefix}ters-yazı**
**➤ ${ayarlar.prefix}saat**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Kullanıcı')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Yardım Sunucu

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!sunucu') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**➤ ${ayarlar.prefix}sunucu-bilgi**
**➤ ${ayarlar.prefix}sunucu-resmi**
**➤ ${ayarlar.prefix}çekiliş**
**➤ ${ayarlar.prefix}üye-durum**
**➤ ${ayarlar.prefix}emojiler**
**➤ ${ayarlar.prefix}sohbet-aç**
**➤ ${ayarlar.prefix}sohbet-kapat**
**➤ ${ayarlar.prefix}oto-rol**
**➤ ${ayarlar.prefix}oto-rol-kapat**
**➤ ${ayarlar.prefix}oto-bot-rol**
**➤ ${ayarlar.prefix}oto-bot-rol-kapat**
**➤ ${ayarlar.prefix}gelen-giden**
**➤ ${ayarlar.prefix}gelen-giden-kapat**
**➤ ${ayarlar.prefix}sayaç**
**➤ ${ayarlar.prefix}sayaç-kapat**
**➤ ${ayarlar.prefix}gelişmiş-sayaç**
**➤ ${ayarlar.prefix}gelişmiş-sayaç-kapat**
**➤ ${ayarlar.prefix}mesaj-log**
**➤ ${ayarlar.prefix}mesaj-log-kapat**
**➤ ${ayarlar.prefix}boost-log**
**➤ ${ayarlar.prefix}boost-log-kapat**
**➤ ${ayarlar.prefix}güvenlik**
**➤ ${ayarlar.prefix}güvenlik-kapat**
**➤ ${ayarlar.prefix}küfür-engel**
**➤ ${ayarlar.prefix}gelişmiş-küfür-engel**
**➤ ${ayarlar.prefix}reklam-engel**
**➤ ${ayarlar.prefix}yavaş-mod**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Sunucu')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Yardım Koruma

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!koruma') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**➤ ${ayarlar.prefix}bot-sistemi**
**➤ ${ayarlar.prefix}limit-sistemi**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Koruma')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Yardım Moderasyon

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!moderasyon') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**➤ ${ayarlar.prefix}yasakla**
**➤ ${ayarlar.prefix}yasağı-kaldır**
**➤ ${ayarlar.prefix}at**
**➤ ${ayarlar.prefix}sil**
**➤ ${ayarlar.prefix}sohbet-aç**
**➤ ${ayarlar.prefix}sohbet-kapat**
**➤ ${ayarlar.prefix}oto-rol**
**➤ ${ayarlar.prefix}oto-rol-kapat**
**➤ ${ayarlar.prefix}oto-bot-rol**
**➤ ${ayarlar.prefix}oto-bot-rol-kapat**
**➤ ${ayarlar.prefix}gelen-giden**
**➤ ${ayarlar.prefix}gelen-giden-kapat**
**➤ ${ayarlar.prefix}sayaç**
**➤ ${ayarlar.prefix}sayaç-kapat**
**➤ ${ayarlar.prefix}gelişmiş-sayaç**
**➤ ${ayarlar.prefix}gelişmiş-sayaç-kapat**
**➤ ${ayarlar.prefix}mesaj-log**
**➤ ${ayarlar.prefix}mesaj-log-kapat**
**➤ ${ayarlar.prefix}güvenlik**
**➤ ${ayarlar.prefix}güvenlik-kapat**
**➤ ${ayarlar.prefix}küfür-engel**
**➤ ${ayarlar.prefix}gelişmiş-küfür-engel**
**➤ ${ayarlar.prefix}reklam-engel**
**➤ ${ayarlar.prefix}yavaş-mod**
**➤ ${ayarlar.prefix}rol-ver**
**➤ ${ayarlar.prefix}toplu-rol-ver**
**➤ ${ayarlar.prefix}toplu-rol-al**
**➤ ${ayarlar.prefix}kullanıcı-bilgi**
**➤ ${ayarlar.prefix}kullanıcı-id**
**➤ ${ayarlar.prefix}çekiliş**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Moderasyon')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Yardım Müzik

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!müzik') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**➤ ${ayarlar.prefix}Müzik**
**➤ ${ayarlar.prefix}Oynat : Şarkı Açarsınız!**
**➤ ${ayarlar.prefix}Durdur : Şarkıyı Kapatırsınız!**
**➤ ${ayarlar.prefix}Atla : Bir Sonraki Seçtiğiniz Şarkıya Geçersiniz!**
**➤ ${ayarlar.prefix}Ses : Ses Seviyesini Ayarlarsınız!**
**➤ ${ayarlar.prefix}Duraklat : Şarkıyı Duraklatırsınız!**
**➤ ${ayarlar.prefix}Devam-Et : Duraklattığınız Şarkıyı Devam Ettirirsiniz!**
**➤ ${ayarlar.prefix}Şimdi : Şuan Oynatılan Şarkı İsmini Gösterirsiniz!**
**➤ ${ayarlar.prefix}Liste : Oynatma Listesine Eklenen Şarkıları Gösterirsiniz!**
**➤ ${ayarlar.prefix}Msc-İstatistik : Botun Durumunu Gösterirsiniz!**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Müzik')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Yardım Eğlence

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!eğlence') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**➤ ${ayarlar.prefix}aduket-çek**
**➤ ${ayarlar.prefix}ara155**
**➤ ${ayarlar.prefix}balık-tut**
**➤ ${ayarlar.prefix}beşlik-çak**
**➤ ${ayarlar.prefix}efkarım**
**➤ ${ayarlar.prefix}espri**
**➤ ${ayarlar.prefix}hesapla**
**➤ ${ayarlar.prefix}kartopu**
**➤ ${ayarlar.prefix}kaç-cm**
**➤ ${ayarlar.prefix}kral-ol**
**➤ ${ayarlar.prefix}slots**
**➤ ${ayarlar.prefix}taksim-dayı**
**➤ ${ayarlar.prefix}tokat-at**
**➤ ${ayarlar.prefix}yazı-tura**
**➤ ${ayarlar.prefix}öp**
**➤ ${ayarlar.prefix}şeker-ye**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Eğlence')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Yardım Ekonomi

client.on('message', message => {
  if (message.content.toLowerCase() === '!ekonomi') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**➤ !cüzdan**
**➤ !günlük**
**➤ !gönder**
**➤ !bahis**
**➤ !çalış**
**➤ !dilen**
**➤ !yetkili (Yetkililere Özel Para)**
**➤ !xp**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Ekonomi')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Yardım Bot

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!bot') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**➤ ${ayarlar.prefix}bot-bilgi**
**➤ ${ayarlar.prefix}ping**
**➤ ${ayarlar.prefix}davet**
**➤ ${ayarlar.prefix}destek**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Bot')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Yardım Bot-Sistemi

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!bot-sistemi') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**• ${ayarlar.prefix}bot-koruma #kanal = Bot Koruma Sistemini Açar!

• ${ayarlar.prefix}bot-koruma-kapat = Bot Koruma Sistemini Kapatırsınız!**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Bot Koruma Sistemi')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Yardım Limit-Sistemi

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!limit-sistemi') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**• ${ayarlar.prefix}ban-limit = Ban Limitini Ayarlarsınız!

• ${ayarlar.prefix}ban-limit-kapat = Ban Limit Sistemini Kapatırsınız!**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Limit Sistemi / BETA')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Not Yardım - sil

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!not-yardım-xd') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**➤ ${ayarlar.prefix}not-ekle <hazne-numarası> <not> : Hazneye Not Ekler!
**➤ ${ayarlar.prefix}not-sil <hazne-numarası> : Haznedeki Notu Siler!
**➤ ${ayarlar.prefix}not-göster <hazne-numarası> : Haznedeki Notu Gösterir!
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Not / BETA')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Not Yardım

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!not-yardım') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
[Discord | Click](https://discord.gg/FVYdpgdja5)
**➤ ${ayarlar.prefix}not-ekle <hazne-numarası> <not> : Hazneye Not Ekler!
➤ ${ayarlar.prefix}not-göster <hazne-numarası> : Haznedeki Notu Gösterir!**
[Discord | Click](https://discord.gg/FVYdpgdja5)
`)
    .setAuthor('BadiGart Bot / Not / BETA')
    .setColor("RGB")

    message.channel.send(kanal);
  }
});

// Prefix

client.on("message",message=>{
    if(message.content==`<@!${client.user.id}>`) return message.channel.send(`**Prefixim :** **${prefix}**`);
})

client.on("message",message=>{
    if(message.content==`<@!${client.user.id}>`) return message.channel.send(`bg!yardım`);
})

// Bot Bilgi

client.on("ready", () => {
    setInterval(function() {
    const uptime = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]"); 
  const embed = new MessageEmbed()
  .setColor("RED")
  .setDescription(`
  
  **Botun Güncel Ping Durumu : ${client.ws.ping}**
 
  **Botun Güncel Kullanıcı Durumu : ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}**
  
  **Botun Güncel Kanal Durumu : ${client.channels.cache.size}**
  
  **Botun Güncel Sunucu Durumu : ${client.guilds.cache.size}**
  
  **Botun Güncel Aktiflik Durumu : ${uptime}**
  `)
  client.channels.cache.get("977131722724495390").messages.fetch("977143986449960980")
          .then(msg => { msg.edit(embed)
          });
  }, 100 * 50);
});

// Uptime

client.on("ready", () => {
    setInterval(function() {
    const uptime = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]"); 
  const embed = new MessageEmbed()
  .setColor("RED")
  .setDescription(`
  
  **Botun Güncel Aktiflik Durumu : ${uptime}**
  
  `)
  client.channels.cache.get("977131814126776360").messages.fetch("977144134324334592")
          .then(msg => { msg.edit(embed)
          });
  }, 100 * 50);
});

// Ping
client.on("ready", () => {
    setInterval(function() {
    const uptime = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]"); 
  const embed = new MessageEmbed()
  .setColor("RED")
  .setDescription(`
  
  **Botun Güncel Ping Durumu : ${client.ws.ping}**
  
  `)
  client.channels.cache.get("977131922838933515").messages.fetch("977144270391767060")
          .then(msg => { msg.edit(embed)
          });
  }, 100 * 50);
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '10k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 10.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '20k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 20.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '35k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 35.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '50k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 50.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '60k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 60.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '70k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 60.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '80k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 80.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '90k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 90.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '100k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 100.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '110k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 60.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '120k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 120.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '130k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 130.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '140k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 140.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '150k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 150.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '160k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 160.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '170k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 170.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '180k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 180.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '190k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 190.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '200k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 200.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '210k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 210.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '220k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 220.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '230k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 230.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '240k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 240.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '250k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 250.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '260k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 260.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '270k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 270.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '280k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 280.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '290k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 290.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '300k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 300.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '310k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 310.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '320k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 320.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '330k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 330.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '340k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 340.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '350k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 350.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '360k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 360.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '500k.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 500.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '1m.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 1.000.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '1.5m.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 1.500.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

// SCoin

client.on('message', message => {
  if (message.content.toLowerCase() === '3m.sc') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : 3.000.000 OwO**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!sc-dur') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : Başarıyla Durduruldu!**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
message.delete();
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!sc-aç') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>

**SCoin Durum : Başarıyla Başlatıldı!**

<:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970><:SCoin:929062484504104970>
`)
    .setColor("BLUE")
  message.delete();
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!sv.o') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
**<:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756>

<:online:936220800439156756> Server Aktif ! <:online:936220800439156756>

<:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756><:online:936220800439156756>**
`)
    .setColor("GREEN")
  message.delete();
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!sv.b') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
**<:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376>

<:Idle:936220800455950376> Server Bakımda ! <:Idle:936220800455950376>

<:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376><:Idle:936220800455950376>**
`)
    .setColor("YELLOW")
  message.delete();
    message.channel.send(kanal);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!sv.k') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
**<:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553>

<:Off:936220800103616553> Server Kapalı ! <:Off:936220800103616553>

<:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553><:Off:936220800103616553>**
`)
    .setColor("RED")
  message.delete();
    message.channel.send(kanal);
  }
});

// AFK

// Eklendim - Atıldım

client.on('guildCreate', guild => {
const log = client.channels.cache.get("918487244166279188")

const famembed = new Discord.MessageEmbed()
.setTitle("Bir Sunucuya Eklendim")
.addField("Sunucu Adı", `${guild.name}`)
.addField("Sunucu Sahibi", `${guild.owner}`)
.addField("Üye Sayısı", `${guild.memberCount}`)
log.send(famembed)
})

client.on('guildDelete', guild => {
const log = client.channels.cache.get("918487286272888892")

const famembed = new Discord.MessageEmbed()
.setTitle("Bir Sunucudan Atıldım")
.addField("Sunucu Adı", `${guild.name}`)
.addField("Sunucu Sahibi", `${guild.owner}`)
.addField("Üye Sayısı", `${guild.memberCount}`)
log.send(famembed)
})

// Kurucuya DM

client.on("guildCreate", guild => {
    const eklendim = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle("⚠️!UYARI!⚠️")
        .setDescription(`**

Bottun Rölünü Tüm Rollerin En Üstüne Koymayı Unutmayın. 

Aksi Takdirde Bot Düzgün Çalışmayacaktır!

Hayırlı Günler...**`)
    guild.owner.send(eklendim)
});

// Raid

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`antiraidapa_${member.guild.id}`);
  if (!kanal) return;
      const gözelkanal = client.channels.get(kanal) 
      if (!gözelkanal) return
  if (member.user.bot == true) {
  if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
  gözelkanal.send("**"+member.user.username + "** Adlı Bota Bir Yetkili İzin Verdi!**.")
  } else {
  gözelkanal.send("**" + member.user.username + "** Adlı Botu Güvenlik Amacı İle Uzaklaştırdım. Tekrar Geldiğinde Uzaklaştırılmasını İstemiyorsanız **!bot-koruma kapat**")
  member.ban()
}
  }
});

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`antiraidK_${member.guild.id}`);
  if (!kanal) return;
  if (member.user.bot == true) {
  member.ban()
  const raidsss = new Discord.MessageEmbed()
  .setDescription(`**${member.user.username} Adlı Botu Güvenlik Amacı İle Uzaklaştırdım! Tekrar Geldiğinde Uzaklaştırılmasını İstemiyorsanız bg!bot-koruma-kapat Yazınız!

Fakat Geri Açmayı Unutmayın!**`)
  member.guild.owner.send(raidsss);
  const raidss = new Discord.MessageEmbed()
  .setDescription(`**${member.user.username} Adlı Botu Güvenlik Amacı İle Uzaklaştırdım! Tekrar Geldiğinde Uzaklaştırılmasını İstemiyorsanız bg!bot-koruma-kapat Yazınız!

Fakat Geri Açmayı Unutmayınız!**`)
  client.channels.cache.get(kanal).send(raidss);
  }
});

// Güvenlik

client.on("guildMemberAdd", async member => {
let theartistkullanici = client.users.cache.get(member.id)
  const theartisthesapkurulus = new Date().getTime()-theartistkullanici.createdAt.getTime();

 let kanal = await db.fetch(`güvenlik_${member.guild.id}`)
 
 if (!kanal) return
 const membed = new Discord.MessageEmbed()
 .setDescription(`**${member.user.tag} İsimli Hesap Sunucuya Giriş Yaptı! | Hesap ${moment.utc(theartistkullanici.createdAt).format('DD / MM / YYYY')} Tarihinde Kurulmuş!**`)
 client.channels.cache.get(kanal).send(membed);
});

// İnvite Rewards

client.on('message', msg => {
  if (msg.content === '!owo') {
   msg.channel.send('Yetkililerimiz En Kısa Sürede Sizinle İlgilenecektir! ||<@&926491609208586300>||')
  }
})

client.on('message', msg => {
  if (msg.content === '!nitro') {
   msg.channel.send('Yetkililerimiz En Kısa Sürede Sizinle İlgilenecektir! ||<@&926491663852011521>||')
  }
})

client.on('message', msg => {
  if (msg.content === '!wroll') {
   msg.channel.send('Yetkililerimiz En Kısa Sürede Sizinle İlgilenecektir! ||<@&926491708898807878>||')
  }
})

client.on('message', msg => {
  if (msg.content === '!wrol') {
   msg.channel.send('Yetkililerimiz En Kısa Sürede Sizinle İlgilenecektir! ||<@&926491708898807878>||')
  }
})

client.on('message', msg => {
  if (msg.content === 'bg!dur') {
    msg.reply('YO DURMAYACAM GJWIQGJIQ')
  }
})

client.on('message', msg => {
  if (msg.content === 'Bg!dur') {
    msg.reply('YO DURMAYACAM GJWIQGJIQ')
  }
})

// Boost Log

client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
  const db = require('saver.db')
  let log = db.fetch(`boostlog_${guild.id}`)
  if(!log) return
  const embed = new Discord.MessageEmbed()
  .setTitle('**Sunucu Boost Seviyesi Atladı!**')
  .setDescription(`**Sunucumuz ${guild.name} Artık ${newLevel} Boost Seviyesinde Tebrikler!**`)
client.channels.cache.get(log).send(embed)
});
client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
  const db = require('saver.db')
  let log = db.fetch(`boostlog_${guild.id}`)
  if(!log) return
  const embed = new Discord.MessageEmbed()
  .setTitle('**Sunucu Boost Seviyesi Düştü!**')
  .setDescription(`**Sunucumuz ${guild.name} Artık ${newLevel} Boost Seviyesinde Üzdü :(**`)
client.channels.cache.get(log).send(embed)
});
client.on("guildMemberBoost", (member) => {
  const db = require('saver.db')
  let log = db.fetch(`boostlog_${member.guild.id}`)
  if(!log) return
  const embed = new Discord.MessageEmbed()
  .setTitle('*Sunucumuza Boost Basıldı!**')
  .setDescription(`**<@${member.id}> Adlı Kullanıcı Sunucumuza Boost Bastı Teşekkürler!**`)
client.channels.cache.get(log).send(embed)
});
client.on("guildMemberUnboost", (member) => {
  const db = require('saver.db')
  let log = db.fetch(`boostlog_${member.guild.id}`)
  if(!log) return
  const embed = new Discord.MessageEmbed()
  .setTitle('**Sunucumuzdan Boost Çekildi!**')
  .setDescription(`**<@${member.id}> Adlı Kullanıcı Sunucumuzdan Boostunu Çekti Üzdü :(**`)
client.channels.cache.get(log).send(embed)
})

// Jai

client.on("guildMemberAdd", async member => {
let engin = db.fetch(`jaillikişi_${member.guild.id}`)
if(engin == member.guild.id) {
let enginar = db.fetch(`jailrol_${member.guild.id}`)
if(!enginar) return;
let log = db.fetch(`jaillog_${member.guild.id}`)
member.guild.members.cache.get(member.guild.id).roles.add(enginar)
const embed = new Discord.MessageEmbed()
.setTitle('Bir kişi jailden kaçmaya çalıştı!')
.setDescription(`<@${member.guild.id}> adlı kişi jailden kaçmaya çalıştı ama ben varken jailden kurtulmak kolay değil :D`)
client.channels.cache.get(log).send(embed)
};
})

// Ban Limit

const ms = require('ms');

client.on('guildBanAdd', async (guild, user) => {
    const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });
    const banLog = fetchedLogs.entries.first();
    if (!banLog) return console.log(`hata 404 error inga :(`);
    const { executor, target } = banLog;
 db.set(`banlimitkişi_${guild.id}.${executor.id}`, 1)
 let engin = db.fetch(`banlimit_${guild.id}`)
 if(!engin) return;
if(executor.id == guild.owner.id) return;
 let enginar = db.fetch(`banlimitkişi_${guild.id}.${executor.id}`)
 if(engin == enginar) {
  guild.members.cache.get(executor.id).ban()
 }
 if(enginar > engin) {
  guild.members.cache.get(executor.id).ban()
 }
  setTimeout(function() {
      db.delete(`banlimitkişi_${guild.id}.${executor.id}`)
  }, ms("10m"));
})

// Mesaj Log

client.on("messageDelete", async message => {
  let engin = db.fetch(`mesajlog_${message.guild.id}`)
  if(!engin) return;
  const embed2 = new Discord.MessageEmbed()
  .setTitle('**Bir Mesaj Silindi!**')
  .setDescription(`**__Kişi Bilgileri__ \n Silen Kişi: <@${message.author.id}> \n Silen Kişinin İD: ${message.author.id} \n \n __Kanal Bilgileri__ \n Silinen Kanal: <#${message.channel.id}> \n Silinen Kanalın İD: ${message.channel.id} \n \n __Mesaj Bilgileri__ \n Silinen Mesaj: ${message.content} \n Silinen Mesajın İD: ${message.id}**`)
  .setColor('RANDOM')
 client.channels.cache.get(engin).send(embed2)
})

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let engin = db.fetch(`mesajlog_${oldMessage.guild.id}`)
  if(!engin) return;
  if(oldMessage.author.bot) return;
  const embed = new Discord.MessageEmbed()
  .setTitle('**Bir Mesaj Düzenlendi!**')
  .setDescription(`**__Kişi Bilgileri__ \n Düzenleyen Kişi: <@${oldMessage.author.id}> \n Düzenleyen Kişinin İD: ${oldMessage.author.id} \n \n __Kanal Bilgileri__ \n Düzenlenen Kanal: <#${oldMessage.channel.id}> \n Düzenlenen Kanalın İD: ${oldMessage.channel.id} \n \n __Mesaj Bilgileri__ \n Düzenlenen Mesaj: ${oldMessage.content} \n Düzenlenen Mesajın Yeni Hali: ${newMessage.content} \n Düzenlenen Mesajın İD: ${oldMessage.id} \n [Düzenlenen Mesaja Gitmek İçin Tıkla!](${oldMessage.url})**`)
  .setColor('RANDOM')
  client.channels.cache.get(engin).send(embed)
  

});

// Oto Rol - BOT

client.on('guildMemberAdd', async member => {
let saverdb = require("saver.db")
  if(await db.has(`otorolB_${member.guild.id}`)) {

 let rolb = await db.fetch(`otoRB_${member.guild.id}`)
 let kanalb = await db.fetch(`otoKB_${member.guild.id}`)
 
 if (!rolb) return
 if (!kanalb) return
 
if (rolb){
 if (member.user.bot) {
 if(rolb){
 member.roles.add(member.guild.roles.cache.get(rolb))
 client.channels.cache.get(kanalb).send(`**Merhaba ${member} , Başarıyla \`BOT\` Rolün Verildi!**`)
    }}}}
})

// Canlı Destek

// Site

client.on('message', message => {
  if (message.content.toLowerCase() === 'bg!site', 'bg!web') {
    const kanal = new MessageEmbed()
    
      .setDescription(`
https://www.badigart.ml
`)
    .setColor("BLUE")
message.delete();
    
    message.channel.send(kanal);
  }
});

// Login - Token

client.login(process.env.token);