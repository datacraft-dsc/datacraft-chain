const DexDeployer = require('../src/dex-deployer')

const DIDRegistry = artifacts.require('DIDRegistry');


module.exports = function(deployer, networkName, accounts) {

    const dexDeployer = new DexDeployer(deployer)

    deployer.then( async () => {
        await dexDeployer.deploy(DIDRegistry)
    })


}

