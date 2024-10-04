const fs = require('fs')
const path = require('path')

function listarArquivos(dir, arquivos, pastaPai, objectEventos, client) {
    const files = fs.readdirSync(dir)

    files.forEach(file => {
        const filePath = path.join(dir, file)

        if (fs.statSync(filePath).isDirectory()) {
            listarArquivos(filePath, arquivos, file, objectEventos, client)
        }
        else if (file.endsWith('.js')) {
            const eventModule = require(filePath)
            const eventName = eventModule.name

            arquivos.push(`${pastaPai}/${file}`)

            if (typeof eventModule.execute === 'function') {
                eventModule.execute(client)
            }

            if (!objectEventos[pastaPai]) objectEventos[pastaPai] = []
            objectEventos[pastaPai].push(eventName)
        }
    })
}

function eventsHandler(client) {
    const eventsPath = path.resolve('./Events')
    let eventNames = []
    const objectEventos = {}

    listarArquivos(eventsPath, eventNames, 'Events', objectEventos, client)

    const eventosCarregados = []

    for (let pastaPai in objectEventos) {
        eventosCarregados.push(`[${pastaPai}: ${objectEventos[pastaPai].join(', ')}]`)
    }

    console.log(`📁 Eventos Carregados: ${eventosCarregados.join(' - ')}`.yellow)
}

module.exports = eventsHandler