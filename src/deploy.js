
/**/

// Handle truffle exec

const truffle = require('truffle')

function deployContract(contractName, methodArgs) {
    await add({ contractsData: [{ name: contractName, alias: contractName }] })
    await push(options);
    methodArgs = methodArgs ? methodArgs : []
    await create(Object.assign({ contractAlias: contractName, methodName: 'initialize', methodArgs: methodArgs }, options))
}

async function main() {
    const contractNameList = [
        'DexToken'
    ]
    contractNameList.forEach( (contractName) => {
        await deployContract(contractName)
    })

}

module.exports = function(callback) {
  main().then(() => callback()).catch(err => callback(err))
};
