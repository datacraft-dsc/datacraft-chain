const DatacraftDeployer = require('../src/datacraft-deployer')

const Dispenser = artifacts.require('Dispenser');
const DatacraftToken = artifacts.require('DatacraftToken');

module.exports = function(deployer, networkName, accounts) {
    const datacraftDeployer = new DatacraftDeployer(deployer)

    deployer.then( async () => {
        const dispenserInstance = await datacraftDeployer.deploy(Dispenser, [DatacraftToken.address, datacraftDeployer.accounts.owner])
        // now setup the miner
        const datacraftTokenInstance = await DatacraftToken.deployed()
        await datacraftTokenInstance.addMinter(dispenserInstance.address, { 'from': datacraftDeployer.accounts.deployer })
        await datacraftTokenInstance.renounceMinter({ 'from': datacraftDeployer.accounts.deployer })
        // console.log(await datacraftTokenInstance.owner())
    })


}


