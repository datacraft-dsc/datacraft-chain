const Purchase = artifacts.require("DirectPurchase");
const stdio = require('stdio');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

var ops = stdio.getopt({
    'artifacts': {key: 'a', description: 'Take ABI from artifacts'},
    'reset': {key: 'r', description: ''},
    'compile-all': {key: 'c', description: ''},
    'network': {key: 'n', description: ''},
    'proxy': {key: 'p', description: 'Deploy upgradable proxy'}
});

function getTokenAddress() {
	const path = require("path");
	var obj = JSON.parse(fs.readFileSync(process.env.ARTIFACTS_FOLDER+'/OceanToken.spree.json'));
	return obj.address;
}

module.exports = async function(deployer, networkName, accounts) {
	if(ops.proxy) {
		const { scripts, ConfigManager } = require('@openzeppelin/cli');
		const { add, push, create } = scripts;
		token_address = getTokenAddress();
		async function installProxy(options) {
		  add({ contractsData: [{ name: 'DirectPurchase', alias: 'DirectPurchase' }] });

		  await push(options);

		  await create(Object.assign({ contractAlias: 'DirectPurchase', methodName: 'initialize', methodArgs:[token_address] }, options));
		}
		deployer.then(async () => {
    		const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: networkName, from: accounts[0] });
    		await installProxy({ network, txParams });

		const networkId = await web3.eth.net.getId();
		obj_json = JSON.parse(fs.readFileSync('.openzeppelin/'+'dev-' + networkId + '.json'));

		proxy_name = Object.keys(obj_json.proxies)[0];
		proxies_number = obj_json.proxies[proxy_name].length;
		proxy = obj_json.proxies[proxy_name][proxies_number - 1];
		
		const { Contracts, SimpleProject, ZWeb3 } = require('@openzeppelin/upgrades');
		const direct_purchase_contract = Contracts.getFromLocal('DirectPurchase');

		let obj = {
			"name": 'DirectPurchase',
			"abi": direct_purchase_contract.schema.abi,
			"address": proxy.address,
			"implementation": proxy.implementation,
			"version": proxy.version
		}
		let data = JSON.stringify(obj);
		fs.writeFileSync(process.env.ARTIFACTS_FOLDER+'/DirectPurchase.spree.json', data);
		console.log("Contract deployed with token address:", token_address);
  		});
	} else {

	if(ops.artifacts) {
            pipeline = deployer.then(() => {
		token_address = getTokenAddress();
	    });
	} else {
	    const Token = artifacts.require("OceanToken");
	    // Deploy the Token contract
	    pipeline = deployer.deploy(Token)
	    // Wait until the storage contract is deployed
	    .then(() => Token.deployed())
	    .then(() => token_address = Token.address);
	}

        // Deploy the Purchase contract, while passing the address of the
        // Token contract
        pipeline.then(() => deployer.deploy(Purchase, token_address))
        .then(() => Purchase.deployed())
        .then(() => {
		console.log("Contract deployed with token address:", token_address);

		let obj = {
			"name": 'DirectPurchase',
			"abi": Purchase.abi,
			"address": Purchase.address,
			"implementation": Purchase.address,
			"version": "v0.10.3"
		}
		let data = JSON.stringify(obj);
		fs.writeFileSync(process.env.ARTIFACTS_FOLDER+'/DirectPurchase.spree.json', data);
	});
	}
}
