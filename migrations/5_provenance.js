const writeContractArtifact = require('../src/writeContract')

const Provenance = artifacts.require("Provenance");


module.exports = function(deployer, networkName, accounts) {
    deployer.deploy(Provenance).then( async () => {
        writeContractArtifact(Provenance, networkName)
    })
}

