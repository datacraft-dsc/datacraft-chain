
/*
 *
 *
 *  Build artifacts library
 *
 */



const artifactsLibrary = require('../src/artifacts-library')
const projectData = require('../package.json')


const artifactsPath = 'artifacts'
const localNetworkId = 1337

module.exports = function(deployer, network) {

    const networkId = deployer.network_id
    const artifactsAll = artifactsLibrary.loadFiles(artifactsPath, { 'neq': networkId })
    let packageData = {
        'artifacts': artifactsAll,
        'version': projectData.version,
    }
    artifactsLibrary.savePackage(`${artifactsPath}/artifacts.json.gz`, packageData)
    console.log('    Created artifacts.json.gz package file.')


    const artifactsNetwork = artifactsLibrary.loadFiles(artifactsPath, { 'eq': networkId })
    packageData = {
        'artifacts': artifactsNetwork,
        'version': projectData.version,
    }

    artifactsLibrary.savePackage(`${artifactsPath}/artifacts.${networkId}.json.gz`, packageData)
    console.log(`    Created artifacts.${networkId}.json.gz package file.`)
};

