const Discord = require("discord.js")
const config = require('../../Configuration/YML').LoadConfiguration();

module.exports.run = async (bot, message, args) => {
    message.channel.send({  content: "Hi!" })
}

module.exports.help = {
    name:"hello",
    description: "",
    usage: "",
    aliases: ["hi"],
    enabled: true
}