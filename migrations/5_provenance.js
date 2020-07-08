const writeContractArtifact = require('../src/writeContract')
const DexDeployer = require('../src/dex-deployer')

const Provenance = artifacts.require("Provenance");


module.exports = function(deployer, networkName, accounts) {

    const dexDeployer = new DexDeployer(deployer)

    deployer.then( async () => {
        await dexDeployer.deploy(Provenance)
    })

}

