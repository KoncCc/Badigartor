const { MessageButton } = require("discord-buttons");

const discord = require("discord.js");

exports.run = async (client, message, args) => {

  let covid = args[0];

  const embed = new discord.MessageEmbed()

    .setDescription(

      `Kullanıcıyı sunucudan yasaklamak için Butona basın.`

    )

    .setTitle("BadiGart | Ban");

  let çalmakyasak = new MessageButton()

    .setStyle("green")

    .setLabel("Banla")

    .setID("click_to_function");

  message.channel.send({ button: çalmakyasak, embed: embed });

  client.on("clickButton", async button => {

    if (button.id == "click_to_function") {

      message.guild.member(covid).ban();

    }

  });

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  permLevel: 0,

  aliases: []

};

exports.help = {

  name: "spr-ban-spr"

}; 

