const Discord = require("discord.js")
const config = require('../../Configuration/YML').LoadConfiguration();
const functions = require('../../Utility/Functions')
module.exports.run = async (bot, message, args) => {
    message.channel.send({ embeds: [ functions.EmbedGenerator(bot, config.ExampleEmbed, ['{ExamplePlaceHolder}:Astro Tech Development', `{AstrosDiscord}--Astro#8173`], message.author)] })
}

module.exports.help = {
    name:"embed",
    description: "",
    usage: "",
    aliases: [],
    enabled: true
}