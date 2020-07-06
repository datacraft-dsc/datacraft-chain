
/*
 *
 *
 *  artifacts library
 *
 */


const fs = require('fs')
const {gzip, ungzip} = require('node-gzip')

module.exports.loadFiles = function(path, filter) {
    const result = {}
    const files = fs.readdirSync(path);
    files.forEach( function(filename) {
        const regexp = /(\w+)\.(\d+)\.json$/i
        let match = filename.match(regexp)
        if (match) {
            const networkId = match[2]
            let isNetworkFilter = filter === undefined
            if ( filter && (filter.eq == networkId || filter.neq != networkId)) {
                isNetworkFilter = true
            }
            if (isNetworkFilter) {
                const buffer = fs.readFileSync(`${path}/${filename}`)
                if (!result[networkId]) {
                    result[networkId] = {}
                }
                const contract = JSON.parse(buffer.toString())
                result[networkId][contract.name] = contract
            }
        }
    })
    return result
}

module.exports.loadPackage = async function(filename) {
    try {
        const buffer = fs.readFileSync(filename)
        if (buffer) {
            const artifactData = await ungzip(buffer)
            return JSON.parse(artifactData.toString())
        }
    } catch(error) {
        console.log(error.message)
    }
}

module.exports.savePackage = async function(filename, artifacts) {
    const data = await gzip(JSON.stringify(artifacts))
    return fs.writeFileSync(filename, data)
}
