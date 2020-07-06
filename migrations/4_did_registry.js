const writeContractArtifact = require('../src/writeContract')

const DIDRegistry = artifacts.require("DIDRegistry");


module.exports = function(deployer, networkName, accounts) {
    deployer.deploy(DIDRegistry).then( async () => {
        writeContractArtifact(DIDRegistry, networkName)
    })
}

