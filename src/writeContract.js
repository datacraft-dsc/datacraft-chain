const fs = require('fs')

module.exports = function writeContractArtifact(artifact, networkName) {

    const artifactData = {
        'name': artifact.contractName,
        'abi': artifact.abi,
        'address': artifact.address,
    }
    const data = JSON.stringify(artifactData);
    fs.writeFileSync(`./artifacts/${artifact.contractName}.${artifact.network_id}.json`, data);
}
