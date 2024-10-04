const fs = require('fs').promises
require('colors')
const Discord = require('discord.js')

async function commandsHandler(client) {
    const slashArray = []
    let comandosCarregados = []
    client.slashCommands = new Discord.Collection()

    try {
        const folders = await fs.readdir('./Commands')

        for (const subfolder of folders) {
            const files = await fs.readdir(`./Commands/${subfolder}/`)

            for (const file of files) {
                if (!file.endsWith('.js')) return

                const command = require(`../Commands/${subfolder}/${file}`)

                if (!command.name) return

                client.slashCommands.set(command.name, command)
                slashArray.push(command)
                comandosCarregados.push(command.name)
            }
        }

        client.on('ready', () => {
            client.guilds.cache.forEach(guild => guild.commands.set(slashArray))
            console.log(`📘 Comandos Carregados: [${comandosCarregados.join(', ')}]`.blue)
        })

    } catch (error) {
        console.log('Erro ao carregar comandos: '.red, error)
    }
}

module.exports = commandsHandler