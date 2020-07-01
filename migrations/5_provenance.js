const Provenance = artifacts.require("Provenance");
const writeContractArtifact = require('./writeContract')

module.exports = function(deployer, network) {
    deployer.deploy(Provenance).then( () => {
        writeContractArtifact(Provenance, network)
    });
};
