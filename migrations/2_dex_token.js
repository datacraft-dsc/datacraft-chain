const writeContractArtifact = require('../src/writeContract')
const DexDeployer = require('../src/dex-deployer')

const DexToken = artifacts.require('DexToken')

module.exports = async function(deployer, networkName, accounts) {

    const dexDeployer = new DexDeployer(deployer)

    deployer.then( async () => {
        await dexDeployer.deploy(DexToken, [dexDeployer.accounts.owner,  dexDeployer.accounts.deployer])
    })
}
