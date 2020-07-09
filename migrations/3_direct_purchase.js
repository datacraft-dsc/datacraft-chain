const DexDeployer = require('../src/dex-deployer')

const DirectPurchase = artifacts.require("DirectPurchase");
const DexToken = artifacts.require('DexToken')


module.exports = function(deployer, networkName, accounts) {

    const dexDeployer = new DexDeployer(deployer)

    deployer.then( async () => {
        await dexDeployer.deploy(DirectPurchase, [DexToken.address])
    })

}

