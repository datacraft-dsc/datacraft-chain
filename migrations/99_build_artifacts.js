
/*
 *
 *
 *  Build artifacts library
 *
 */



const artifactsLibrary = require('../src/artifacts-library')
const projectData = require('../package.json')


const ARTICFACTS_PATH = 'artifacts'

module.exports = function(deployer) {

    const artifacts = artifactsLibrary.load(ARTICFACTS_PATH)
    const packageData = {
        'artifacts': artifacts,
        'version': projectData.version,
    }
    artifactsLibrary.save(`${ARTICFACTS_PATH}/artifacts.json.gz`, packageData)
    console.log('    Created artifacts.json.gz package file.')
};

