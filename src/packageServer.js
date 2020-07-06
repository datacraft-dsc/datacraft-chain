
const fs = require('fs')
const express = require('express');
const artifactsLibrary = require('./artifacts-library')
const projectData = require('../package.json')


const app = express()
const port = 8550

const networkId = 1337
const artifactFolder = 'artifacts'
const packageFilename = `${artifactFolder}/artifacts.${networkId}.json.gz`

app.get('/', (request, response) => {
    const status = {
        'status': 'WAIT',
        'networkId': networkId,
        'version': projectData.version
    }
    fs.access(packageFilename, fs.constants.F_OK, (err) => {
        if (!err) {
            status.status = 'READY'
        }
        response.send(status)

    })
})

app.get('/artifacts', async (request, response) => {
    const packageData = await artifactsLibrary.loadPackage(packageFilename)
    if (packageData) {
        response.send(packageData)
    } else {
        response.send('{}')
    }
})

app.listen(port, () => {
    console.log(`Contract Package server running on http:\\localhost:${port}`)
})
