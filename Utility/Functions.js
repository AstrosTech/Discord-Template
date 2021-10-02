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

module.exports.Placeholders = (bot, message, user, placeholders) => {
    if(typeof message != "string") return
    let ReplacedMessage = message
    
    if(placeholders != null) {
        for (let i = 0; i < placeholders.length; i++) {
            let Placeholder = placeholders[i]

            let SplitPlaceholders;
            if(Placeholder.includes('--')) SplitPlaceholders = Placeholder.split('--'); // Allows for URLS to be used as custom placeholders
            else SplitPlaceholders = Placeholder.split(":")
            ReplacedMessage = ReplacedMessage.replace(SplitPlaceholders[0], SplitPlaceholders[1])
        }
    }
    if(user != null) {
        ReplacedMessage = ReplacedMessage
        .replace("{UserID}", user.id)
        .replace("{Username}", user.username)
        .replace("{CreatedOn}", moment(user.createdAt).format('llll'))
        .replace("{UserDiscriminator}", user.discriminator)
        .replace("{UserPing}", user.toString())
        .replace("{AvatarURL}", user.avatarURL())
    }
    let Guild = bot.guilds.cache.get(config.GuildID)
    
    ReplacedMessage = ReplacedMessage
    .replace("{GuildID}", Guild.id)
    .replace("{Security}", Guild.verificationLevel)
    .replace("{CreatedAt}", `${Guild.createdAt.getMonth()}/${Guild.createdAt.getDate()}/${Guild.createdAt.getFullYear()}`)
    .replace("{TotalChannels}", Guild.channels.cache.size)
    .replace("{TextChannelSize}", Guild.channels.cache.filter(channel => channel.type === "GUILD_TEXT").size)
    .replace("{VoiceChannelSize}", Guild.channels.cache.filter(channel => channel.type === "GUILD_VOICE").size)
    .replace("{CategorySize}", Guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").size)
    .replace("{TotalMembers}", Guild.memberCount)
    .replace("{TotalUsers}", Guild.members.cache.filter(member => !member.user.bot).size)
    .replace("{TotalBots}", Guild.members.cache.filter(member => member.user.bot).size)
    .replace("{ServerName}", config.ServerName)
    .replace("{ServerColor}", config.ServerColor)
    .replace("{TimeStamp}", `${moment().tz('America/New_York').format("dddd, MMMM Do, h:mm a")} EST`)
    
    return ReplacedMessage
}

module.exports.EmbedGenerator = (bot, EmbedInformation, Placeholders, User) => {
        let Embed = new Discord.MessageEmbed()
    
        if(EmbedInformation.Title && EmbedInformation.Title.length > 0) Embed.setTitle(exports.Placeholders(bot, EmbedInformation.Title, User, Placeholders))
        if(EmbedInformation.Color && EmbedInformation.Color.length > 0) Embed.setColor(exports.Placeholders(bot, EmbedInformation.Color, User))
        if(EmbedInformation.Thumbnail && EmbedInformation.Thumbnail.length > 0) Embed.setThumbnail(exports.Placeholders(bot, EmbedInformation.Thumbnail, User, Placeholders))

        if(EmbedInformation.Description && EmbedInformation.Description.length > 0) Embed.setDescription(exports.Placeholders(bot, EmbedInformation.Description, User, Placeholders))
        
        if(EmbedInformation.Fields != null) {
            if(Object.keys(EmbedInformation.Fields).length > 0) { 
                for(FieldInformation of Object.values(EmbedInformation.Fields)) { 
                    Embed.addField(exports.Placeholders(bot, FieldInformation.Name, User, Placeholders), exports.Placeholders(bot, FieldInformation.Value, User, Placeholders), exports.Placeholders(bot, FieldInformation.Inline, User, Placeholders)) 
                } 
            }
        }

        if(User && EmbedInformation.Author && EmbedInformation.Author.length > 0) Embed.setAuthor(exports.Placeholders(bot, EmbedInformation.Author, User, Placeholders), User.avatarURL())

        if(EmbedInformation.Image && EmbedInformation.Image.length > 0) Embed.setImage(exports.Placeholders(bot, EmbedInformation.Image, User, Placeholders))
        if(EmbedInformation.Footer && EmbedInformation.Footer.length > 0) Embed.setFooter(exports.Placeholders(bot, EmbedInformation.Footer, User, Placeholders))
        
        return Embed
}