const Discord = require('discord.js')

const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.DirectMessages,
        Discord.IntentsBitField.Flags.GuildInvites,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.GuildPresences,
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.MessageContent,
        Discord.IntentsBitField.Flags.GuildMessageReactions,
        Discord.IntentsBitField.Flags.GuildEmojisAndStickers,
        Discord.IntentsBitField.Flags.GuildVoiceStates,
        Discord.IntentsBitField.Flags.GuildMessages
    ],
    partials: [
        Discord.Partials.User,
        Discord.Partials.Message,
        Discord.Partials.Reaction,
        Discord.Partials.Channel,
        Discord.Partials.GuildMember
    ]
})

require('./Handler/commands')(client)
require('./Handler/events')(client)

client.on('interactionCreate', (interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const command = client.slashCommands.get(interaction.commandName)

        if (!command) {
            interaction.reply({ ephemeral: true, content: 'Algo deu errado!' })
        } else {
            command.run(client, interaction)
        }
    }
})

const config = require('./config')
client.login(config.discord.token)

process.on('unhandledRejection', (reason, p) => {
  console.error('[ Event Error: unhandledRejection ]', p, 'reason:', reason)
})
process.on("uncaughtException", (err, origin) => {
  console.error('[ Event Error: uncaughtException ]', err, origin)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.error('[ Event Error: uncaughtExceptionMonitor ]', err, origin);
})

module.exports = client