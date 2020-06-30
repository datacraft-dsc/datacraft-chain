const Dispenser = artifacts.require("Dispenser");
const writeContractArtifact = require('./writeContract')


module.exports = function(deployer, network) {
    if ( network === 'local') {
        deployer.deploy(Dispenser).then( () => {
        writeContractArtifact(Dispenser, network)
    });
    }
};
