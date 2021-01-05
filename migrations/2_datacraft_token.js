const DatacraftDeployer = require('../src/datacraft-deployer')

const DatacraftToken = artifacts.require('DatacraftToken')

module.exports = async function(deployer, networkName, accounts) {

    const datacraftDeployer = new DatacraftDeployer(deployer)

    deployer.then( async () => {
        await datacraftDeployer.deploy(DatacraftToken, [datacraftDeployer.accounts.owner,  datacraftDeployer.accounts.deployer])
    })
}
