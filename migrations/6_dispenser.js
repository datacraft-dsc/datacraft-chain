const writeContractArtifact = require('../src/writeContract')
const DexDeployer = require('../src/dex-deployer')

const Dispenser = artifacts.require('Dispenser');
const DexToken = artifacts.require('DexToken');

module.exports = function(deployer, networkName, accounts) {
    const dexDeployer = new DexDeployer(networkName, accounts)

    deployer.then( async () => {
        const dispenserInstance = await dexDeployer.deploy(Dispenser, [DexToken.address, dexDeployer.accounts.owner])
        // now setup the miner
        const dexTokenInstance = await DexToken.deployed()
        await dexTokenInstance.addMinter(dispenserInstance.address, { 'from': dexDeployer.accounts.deployer })
        await dexTokenInstance.renounceMinter({ 'from': dexDeployer.accounts.deployer })
        // console.log(await dexTokenInstance.owner())
    })


}


