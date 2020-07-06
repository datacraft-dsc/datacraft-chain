const { scripts, ConfigManager } = require('@openzeppelin/cli')
const { add, push, create } = scripts
const writeContractArtifact = require('./writeContract')


module.exports = async function(contractName, methodArgs, options) {

    console.log(contractName)
    await add({ contractsData: [{ name: contractName, alias: contractName }] })
    await push(options);
    methodArgs = methodArgs ? methodArgs : []
    await create(Object.assign({ contractAlias: contractName, methodName: 'initialize', methodArgs: methodArgs }, options))

//    const deployedContract = await contract.deployed()
    //console.log('address', contract.address)
    //writeContractArtifact(contract, networkName)

}




