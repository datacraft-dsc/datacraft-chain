const fs = require('fs')
const { scripts, ConfigManager } = require('@openzeppelin/cli')
const { add, push, create } = scripts


class DexDeployer {


    constructor(networkName, accounts) {
        this.networkName = networkName
        this.networkAccounts = accounts
        // at the moment hard coded, maybe have this in a config file somewhere ?
        this.accounts = {
            'deployer': '0x32F098d6965ef0164151162787C69219F6D333dB',
            'owner': '0xB4CB6E576409e0CbA1ae44Bd68B6F9551987AFee',
        }
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








