const Discord = require('discord.js');
const ms = require('ms');

    exports.run = (client, message, args) => {

        // Yetki İçin
         if(!message.member.roles.cache.get("931974821284286465")){
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
            message.channel.send(jail).then(message => message.delete({ timeout: 8000 }));
            // Jail Atıldığı Zaman Verilecek & Alınacak Roller
                kullanıcı.roles.add('931975208921862234')
                kullanıcı.roles.remove('852123271158562816')
                kullanıcı.roles.remove('929640823807688764')
                kullanıcı.roles.remove('921482213793620009')
                kullanıcı.roles.remove('926491708898807878')
                kullanıcı.roles.remove('926491609208586300')
                kullanıcı.roles.remove('926491663852011521')
                kullanıcı.roles.remove('907335063644028968')
                kullanıcı.roles.remove('928612455750467634')
                kullanıcı.roles.remove('927636873201999972')
                kullanıcı.roles.remove('920757767826985002')
                kullanıcı.roles.remove('920652695604432966')
                kullanıcı.roles.remove('920652522039955506')
                kullanıcı.roles.remove('920652250257432627')
                kullanıcı.roles.remove('920651840297762846')
                kullanıcı.roles.remove('920651214801235998')
                kullanıcı.roles.remove('930865454774378618')
                kullanıcı.roles.remove('917763089234001981')
                kullanıcı.roles.remove('921819722754981938')
                kullanıcı.roles.remove('921819573471289404')
                kullanıcı.roles.remove('921819260823687260')
                kullanıcı.roles.remove('905488552991801365')
                kullanıcı.roles.remove('905461317190692916')
            // Jail Bittiği Zaman Verilecek & Alınacak Roller
                setTimeout(() => {
                    kullanıcı.roles.remove('931975208921862234')
                    kullanıcı.roles.add('905461317190692916')
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
    name: 'ceza',
    description: 'CodeMareFi Süreli Jail',
    usage: '.jail @kişi süre sebep'
}