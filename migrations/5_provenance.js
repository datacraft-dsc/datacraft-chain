const writeContractArtifact = require('../src/writeContract')
const DexDeployer = require('../src/dex-deployer')

const Provenance = artifacts.require("Provenance");


module.exports = function(deployer, networkName, accounts) {

    const dexDeployer = new DexDeployer(networkName, accounts)

    deployer.then( async () => {
        await dexDeployer.deploy(Provenance)
    })

}

