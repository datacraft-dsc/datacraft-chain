const DatacraftDeployer = require('../src/datacraft-deployer')

const Provenance = artifacts.require("Provenance");


module.exports = function(deployer, networkName, accounts) {

    const datacraftDeployer = new DatacraftDeployer(deployer)

    deployer.then( async () => {
        await datacraftDeployer.deploy(Provenance)
    })

}

