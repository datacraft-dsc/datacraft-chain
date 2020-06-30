const DIDRegistry = artifacts.require("DIDRegistry");
const writeContractArtifact = require('./writeContract')

module.exports = function(deployer, network) {
  deployer.deploy(DIDRegistry).then( () => {
        writeContractArtifact(DIDRegistry, network)
    });
};
