const Purchase = artifacts.require("DirectPurchase");
const stdio = require('stdio');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

var ops = stdio.getopt({
    'artifacts': {key: 'a', description: 'Take ABI from artifacts'},
    'reset': {key: 'r', description: ''},
    'compile-all': {key: 'c', description: ''}
});

function getTokenAddress() {
	const path = require("path");
	var obj = JSON.parse(fs.readFileSync(process.env.ARTIFACTS_FOLDER+'/OceanToken.spree.json'));
	return obj.address;
}

module.exports = async function(deployer) {
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
