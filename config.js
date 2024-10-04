require('dotenv').config()

const config = {
    discord: {
        token: process.env.DISCORD_BOT_TOKEN,
        color: '00FF7F'
    }
}

module.exports = config