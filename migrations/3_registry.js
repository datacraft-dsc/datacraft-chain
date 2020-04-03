const DIDRegistry = artifacts.require("DIDRegistry");
const stdio = require('stdio');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

var ops = stdio.getopt({
    'artifacts': {key: 'a', description: 'Take ABI from artifacts'},
    'reset': {key: 'r', description: ''},
    'compile-all': {key: 'c', description: ''},
    'network': {key: 'n', description: ''},
    'from': {key: 'f', description: 'Truffle migrate from'},
    'proxy': {key: 'p', description: 'Deploy upgradable proxy'}
});

module.exports = async function(deployer, networkName, accounts) {
	const { scripts, ConfigManager } = require('@openzeppelin/cli');
	const { add, push, create } = scripts;

	async function installProxy(options) {
	  add({ contractsData: [{ name: 'DIDRegistry', alias: 'DIDRegistry' }] });

	  await push(options);

	  await create(Object.assign({ contractAlias: 'DIDRegistry', methodName: 'initialize', methodArgs:[] }, options));
	}
	deployer.then(async () => {
	const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: networkName, from: accounts[0] });
	await installProxy({ network, txParams });

	const networkId = await web3.eth.net.getId();
	obj_json = JSON.parse(fs.readFileSync('.openzeppelin/'+'dev-' + networkId + '.json'));

	let indexProxy = 1;
	if(!ops.proxy)
	  indexProxy--;
	proxy_name = Object.keys(obj_json.proxies)[indexProxy];
	proxies_number = obj_json.proxies[proxy_name].length;
	proxy = obj_json.proxies[proxy_name][proxies_number - 1];
	
	const { Contracts, SimpleProject, ZWeb3 } = require('@openzeppelin/upgrades');
	const registry_contract = Contracts.getFromLocal('DIDRegistry');

	let obj = {
		"name": 'DIDRegistry',
		"abi": registry_contract.schema.abi,
		"address": proxy.address,
		"implementation": proxy.implementation,
		"version": proxy.version
	}
	let data = JSON.stringify(obj);
	fs.writeFileSync(process.env.ARTIFACTS_FOLDER+'/DIDRegistry.'+ networkName + '.json', data);
	});
}
