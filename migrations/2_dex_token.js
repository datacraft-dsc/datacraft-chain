const DexToken = artifacts.require('DexToken');
const writeContractArtifact = require('./writeContract')

module.exports = function(deployer, network) {
    deployer.deploy(DexToken).then( () => {
        writeContractArtifact(DexToken, network)
    });
};
