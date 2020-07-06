const writeContractArtifact = require('../src/writeContract')

const DirectPurchase = artifacts.require("DirectPurchase");
const DexToken = artifacts.require('DexToken')


module.exports = function(deployer, networkName, accounts) {

    deployer.deploy(DirectPurchase).then( async () => {
        const instance = await DirectPurchase.deployed()
        await instance.methods['initialize(address)'](DexToken.address, {from: accounts[0]})
        writeContractArtifact(DirectPurchase, networkName)
    })
}

