const Discord = require("discord.js")
const config = require('../../Configuration/YML').LoadConfiguration();

module.exports.run = async (bot, message, args) => {
    message.channel.send({  content: "Bye!" })
}

module.exports.help = {
    name:"bye",
    description: "",
    usage: "",
    aliases: ["goodbye"],
    enabled: true
}