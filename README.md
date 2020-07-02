# Dex-chain

This repo now installs the Dex contracts, and also runs dex block chain network for testing.

## Development
To develop any contract you need to install the supported packages.

```
npm install
```

To compile the contracts, you need to type:
```
npm run compile
```

## Installing
Currently this repo only installs contracts to a local private block chain.
So first you need to open a new terminal and start the private block chain.

```
./scripts/run_local_network.sh
```

Then you can install all of the contracts by typing:
```
npm run install:local
```


## Local Private Network
The local private network has the following accounts pre-loaded with Ethereum balances:

+   0x32F098d6965ef0164151162787C69219F6D333dB
+   0xB4CB6E576409e0CbA1ae44Bd68B6F9551987AFee
+   0x8d5606e48c385cf8e4198439fa4cdf42b4dbb8c8
+   0xAa7CA83822670633D633D0195BC7d68EDF5b2ea0
+   0x8D5606e48c385CF8E4198439Fa4cDF42B4DBb8C8

The first three accounts are unlocked, and for all of the accounts the password is **dex-secret**.


## Building Java artifacts template files
To build the Java runtime, you need to the run:

```
./scripts/build_java_artifacts.sh
```
The template files will be writtern to the `build/src/` folder.

## Run the local private network for testing
If you have `geth` and `node` already installed, then you can run and install the contracts for testing as follows:
```
./scripts/run_local_network.sh install
```

Or you can run the docker file, which will do the same but you do not need to install any of the packages/software to run the private network.
```
docker run -t dex-chain -p 8545:9545 -p 8550:8550 './scripts/run_local_network.sh' install
```

## Contract Artifact Packages

### Building Contract Artifact Packages
As each deployed contract the truffle migration script will create an artifact file. At the end of the deployment the script will then add artifact packages.

The deploy steps for any network are as follows:

+   Deploy the contract on the network.

+   Write an artifact file with the contract address into the folder:

        artifacts/<contractName>.<networkId>.json

+   At the end of the deployment, create two artifact package files:

    `artifacts/artifacts.json.gz` : This file contains all of the published contracts in all networks except the local private network ( 1337 ).

    `artifacts/artifacts.<networkId>.json.gz` : This contains all of the contracts currently deployed on the network with the id **networkId**.


### Using Contract Artifact Packages
So there are three methods for a starfish library to load the contract ABI files and contract addresses via the artifact files.

1. Load the ABI files using a template library ( Java ).

2. Copy artifact files directly from the artifact folder on the network chain, at start of runtime.

3. Include the `artifacts.json.gz` with the starfish library and use this for accessing contracts, by gunzip the files data and reading the JSON object.


### Local Private Network
With the Local Private Network, there is an issue in obtaining the correct contract address. Since the contracts have just been deployed the addresses will always be different. So instead of copying the artifact files directly or using a pre-build artifact package file, the Local Private Network runs a simple http server at **http://localhost:8550** that provides the following uri's:

+   /           GET       - return the status of the network, networkId and dex-chain version.

+   /artifacts  GET       - If deployed returns a JSON object with all of the deployed artifacts. If not deployed returns an empty object.

The starfish library can the just request this server for the latest artifacts to be included into the library.



