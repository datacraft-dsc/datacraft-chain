const Purchase = artifacts.require("DirectPurchase");
const stdio = require('stdio');
const fs = require('fs');

var ops = stdio.getopt({
    'artifacts': {key: 'a', description: 'Take ABI from artifacts'},
    'reset': {key: 'r', description: ''},
    'compile-all': {key: 'c', description: ''}
});

module.exports = async function(deployer) {
	if(ops.artifacts) {
            pipeline = deployer.then(() => {
		const path = require("path");
		var obj = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../artifacts/OceanToken.spree.json")));
		token_address = obj.address;
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
		fs.writeFileSync('artifacts/DirectPurchase.spree.json', data);
	});
}
