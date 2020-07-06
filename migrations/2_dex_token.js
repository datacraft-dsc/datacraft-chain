const writeContractArtifact = require('../src/writeContract')

const DexToken = artifacts.require('DexToken')

const owner = '0xB4CB6E576409e0CbA1ae44Bd68B6F9551987AFee'
const minter = '0x32F098d6965ef0164151162787C69219F6D333dB'

module.exports = async function(deployer, networkName, accounts) {
    deployer.deploy(DexToken).then( async () => {
        const instance = await DexToken.deployed()
        await instance.methods['initialize(address,address)'](owner,  minter, {from: owner})
        writeContractArtifact(DexToken, networkName)
    })
}
