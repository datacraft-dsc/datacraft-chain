const DirectPurchase = artifacts.require("DirectPurchase");
const writeContractArtifact = require('./writeContract')

module.exports = function(deployer, network) {
  deployer.deploy(DirectPurchase).then( () => {
        writeContractArtifact(DirectPurchase, network)
    });
};
