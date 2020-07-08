const fs = require('fs')
const { scripts, ConfigManager } = require('@openzeppelin/cli')
const { add, push, create } = scripts


class DexDeployer {


    constructor(deployer) {
        this.networkName = deployer.network
        // the accounts to use are taken from the 'truffle-config.js file'
        // their should be two types 'deployer & owner'
        this.accounts = deployer.networks[this.networkName].accounts
    }

    async deployContract(contractName, methodArgs, options) {
        console.log(`Deploying ${contractName}`)
        add({ contractsData: [{ name: contractName, alias: contractName }] })
        await push(options);
        methodArgs = methodArgs ? methodArgs : []
        return create(Object.assign({ contractAlias: contractName, methodName: 'initialize', methodArgs: methodArgs }, options))
    }

    writeArtifactFile(contract, instance) {
        const artifactData = {
            'name': contract.contractName,
            'abi': instance.schema.abi,
            'address': instance.address,
        }
        const data = JSON.stringify(artifactData);
        fs.writeFileSync(`./artifacts/${contract.contractName}.${contract.network_id}.json`, data);
    }

    async deploy(contract, methodArgs) {
        const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: this.networkName, from: this.accounts.deployer })
        const instance = await this.deployContract(contract.contractName, methodArgs, { network, txParams })
        this.writeArtifactFile(contract, instance)
        return instance
    }
}

module.exports = DexDeployer








