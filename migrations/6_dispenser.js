const writeContractArtifact = require('../src/writeContract')

const Dispenser = artifacts.require("Dispenser");
const DexToken = artifacts.require('DexToken');

const owner = '0xB4CB6E576409e0CbA1ae44Bd68B6F9551987AFee'

module.exports = function(deployer, networkName, accounts) {
    deployer.deploy(Dispenser).then( async () => {
        const instance = await Dispenser.deployed()
        await instance.methods['initialize(address,address)'](DexToken.address, owner, {from: owner})
        writeContractArtifact(Dispenser, networkName)
    })
}

