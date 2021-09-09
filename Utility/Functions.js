const Discord = require('discord.js');
const config = require('../Configuration/YML').LoadConfiguration();
const moment = require('moment-timezone');
const chalk = require('chalk')
const figlet = require('figlet');



module.exports.Start = (bot) => {
    let Guild = bot.guilds.cache.get(config.GuildID)
    if(!Guild) {
        console.log(chalk.bold(chalk.cyan("[Astro Tech] ") + "»" + chalk.white(" GuildID set incorrectly in the configuration. Bot turning off...")))
        process.exit()
    }
    figlet.text("Astro Tech", function (err, data) { if(err) console.trace(err); console.log(chalk.bold(chalk.blueBright(data) + chalk.white(`\nBot Information`) + chalk.white(`\n\u2003\u2003\u2003Username: `) + chalk.green(`${bot.user.username}`) + chalk.white(`\n\u2003\u2003\u2003ID: `) + chalk.green(`${bot.user.id}`) + chalk.white(`\n\u2003\u2003\u2003Guilds: `) + chalk.green(`${bot.guilds.cache.map(guild => guild.name).join(", ")}`))) })
}

