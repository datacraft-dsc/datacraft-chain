const DatacraftDeployer = require('../src/datacraft-deployer')

const DIDRegistry = artifacts.require('DIDRegistry');


module.exports = function(deployer, networkName, accounts) {

    const datacraftDeployer = new DatacraftDeployer(deployer)

    deployer.then( async () => {
        await datacraftDeployer.deploy(DIDRegistry)
    })


}

