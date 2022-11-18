const Discord = require('discord.js');
const ms = require('ms');

    exports.run = (client, message, args) => {

        // Yetki İçin
         if(!message.member.roles.cache.get("932181942361812992")){
             const yetki = new Discord.MessageEmbed()
             .setColor('BLACK')
             .setDescription(` ${message.author} **Bu Kodu Kullana Bilmek İçin Yeterli Yetkin Bulunmuyor...** `)
             message.delete();
             return message.channel.send(yetki).then(message => message.delete({ timeout: 8000 }));
        }

        let kullanıcı = message.mentions.members.first();
        let sure = args[1];
        let sebep = args.slice(2).join(' ');

        if(!kullanıcı){
            const kullanicihatasi = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription(` ** ${message.author} Kullanıcı Bulunamadı, Lütfen Kullanıcı Etiketle** `)
            .setFooter('Ceza Hatası ❌')
            message.delete();
            return message.channel.send(kullanicihatasi).then(message => message.delete({ timeout: 8000 }));
        }
        
        if(!sure){
            const surehatasi = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription(` ** ${message.author} Süre Girmeyi Unuttun, \n\n \` 1s = 1 Saniye || 1h = 1 Saat || 1d = 1 Gün || 1y = 1 Yıl \` ** `)
            .setFooter('Ceza Hatası ❌')
            message.delete();
            return message.channel.send(surehatasi).then(message => message.delete({ timeout: 8000 }));
        }

        if(!sebep){
            const sebephatasi = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription(` ** ${message.author} **Lütfen Geçerli Bir Sebep Giriniz...** `)
            .setFooter('Ceza Hatası ❌')
            message.delete();
            return message.channel.send(sebephatasi).then(message => message.delete({ timeout: 8000 }));
        }

        if(kullanıcı || sure || sebep){
            const jail = new Discord.MessageEmbed()
            .setDescription(`**${kullanıcı} Kişisi ${message.author} Tarafından, ${sebep} Sebebiyle ${sure.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün')} Boyunca Ceza Verildi!**`)
            .setColor('#00FF00')
            .setTitle(` **Başarıyla Ceza Verildi!** `)
            message.delete();
            message.channel.send(jail)
            // Jail Atıldığı Zaman Verilecek & Alınacak Roller
                kullanıcı.roles.add('932182001623117834')
                kullanıcı.roles.remove('932154727318310923')
                kullanıcı.roles.remove('932154727125352498')
                kullanıcı.roles.remove('932176963844599838')
                kullanıcı.roles.remove('932156532278317066')
                kullanıcı.roles.remove('932154725980315649')
                kullanıcı.roles.remove('932154693478678558')
                kullanıcı.roles.remove('932154725485387856')
            // Jail Bittiği Zaman Verilecek & Alınacak Roller
                setTimeout(() => {
                    kullanıcı.roles.remove('932182001623117834')
                    kullanıcı.roles.add('932154727318310923')
                    // Jail Bitince Kanal Bilgilendirme Mesajı Atalım

                    client.channels.cache.get('931973413239672923').send(` **${kullanıcı} Jail Süren Doldu Umarım Tekrarlamazsın!** `)
                }, ms(sure))
        }
    } 

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Jail','karantina','Karantina','JAİL','Cezalı','cezalı','Ceza-ver','ceza-ver'],
    permLevel: 0
}

exports.help = {
    name: 'hapis',
    description: 'CodeMareFi Süreli Jail',
    usage: '.jail @kişi süre sebep'
}