
/*
 *
 *
 *  Build artifacts library
 *
 */


const fs = require('fs')
const {gzip} = require('node-gzip')

module.exports.load = function(path) {
    const result = {
        'artifacts': {},
    }
    const files = fs.readdirSync(path);
    files.forEach( function(filename) {
        const regexp = /(\w+)\.(\d+)\.json/i
        let match = filename.match(regexp)
        if (match) {
            const networkId = match[2]
            const buffer = fs.readFileSync(`${path}/${filename}`)
            if (!result.artifacts[networkId]) {
                result.artifacts[networkId] = {}
            }
            const contract = JSON.parse(buffer.toString())
            result.artifacts[networkId][contract.name] = contract
//            console.log(result)
        }
    })
    return result
}

module.exports.save = async function(filename, artifacts) {
    const data = await gzip(JSON.stringify(artifacts))
    return fs.writeFileSync(filename, data)
}
