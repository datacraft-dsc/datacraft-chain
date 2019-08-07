const Purchase = artifacts.require("DirectPurchase");
const Token = artifacts.require("OceanToken");

module.exports = function(deployer) {
    // Deploy the Token contract
    deployer.deploy(Token)
        // Wait until the storage contract is deployed
        .then(() => Token.deployed())
        // Deploy the Purchase contract, while passing the address of the
        // Token contract
        .then(() => deployer.deploy(Purchase, Token.address));
}
