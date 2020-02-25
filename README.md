# Direct purchase using Ocean token

## Install Solidity compiler for Ubuntu and Truffle environment
```
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt install nodejs
sudo apt install npm
sudo apt install gcc g++ make
sudo apt-get install solc
```
## Install Truffle
```
sudo npm init -y
sudo npm install --save-exact truffle
sudo npm install --save-exact dotenv
npm install web3-provider-engine
truffle init
```
## Install Openzeppelin for upgradability support
```
npm install --global @openzeppelin/cli
npm install @openzeppelin/upgrades
npm install @openzeppelin/contracts-ethereum-package
openzeppelin init
openzeppelin link @openzeppelin/contracts-ethereum-package --push <network name> --skip-compile 
openzeppelin add DirectPurchase
openzeppelin add DIDRegistry
```
## To compile and deploy with Truffle
#### Locally with compiling simulated Ocean Token on the empty network
```
export NODE_HOST="127.0.0.1"
export NODE_PORT=8545
export ARTIFACTS_FOLDER=artifacts
truffle compile
trufle migrate
# or to re-build from scratch:
truffle migrate --reset --compile-all
```
#### Locally with reusing existing Ocean Token on running barge
```
export NODE_HOST="127.0.0.1"
export NODE_PORT=8545
export ARTIFACTS_FOLDER=artifacts
truffle compile
trufle migrate --artifacts
# or to re-build from scratch:
truffle migrate --reset --compile-all --artifacts
```
#### Locally with reusing existing Ocean Token on running barge with upgradable proxy deployment
```
export NODE_HOST="127.0.0.1"
export NODE_PORT=8545
export ARTIFACTS_FOLDER=artifacts
truffle migrate --reset --compile-all --proxy
```
#### Upgradable proxy deployment to Nile network
```
# to prepare correct OceanToken artifacts file
export NODE_HOST="https://nile.dev-ocean.com"
export NODE_PORT=8545
export ARTIFACTS_FOLDER=artifacts
openzeppelin link @openzeppelin/contracts-ethereum-package --push nile --skip-compile 
truffle migrate --network nile --reset --compile-all --proxy
```
#### To recompile Solidity contract and upgrade proxy
```
openzeppelin upgrade
```
#### Using docker container on running barge
```
# Download artifacts to your host folder
docker run --net=ocean_backend -i -t --rm -v <full path to your host artifacts folder>:/usr/local/keeper-contracts --env NODE_HOST="keeper-node" --env NODE_PORT=8545 --env ARTIFACTS_FOLDER=/usr/local/keeper-contracts direct-purchase
# To observe newly generated DirectPurchase.spree.json artifact file in your host artifacts folder
```
## Install dependecies for Python
```
virtualenv -p /usr/bin/python3.6 venv
source venv/bin/activate
pip3 install 'web3==4.5.0' # only this version works fine with parity and locking/unlocking account feature
pip3 install py-solc-x
python -m solcx.install v0.5.6
```
## To compile and deploy with Python
```
python compile.py
```
## To compile ABI for Java
```
curl -L https://get.web3j.io | sh
source $HOME/.web3j/source.sh
web3j truffle generate --javaTypes ./build/contracts/DirectPurchase.json -o src/main/java/ -p sg.dex.starfish.dexchain
web3j truffle generate --javaTypes ./build/contracts/DIDRegistry.json -o src/main/java/ -p sg.dex.starfish.dexchain
web3j truffle generate --javaTypes ./build/contracts/Provenance.json -o src/main/java/ -p sg.dex.starfish.dexchain
```
# Dex chain

## Run parity node
```
./run_dex_chain.sh
```
## Add acount
```
docker run -it -v $PWD/parity:/parity parity/parity:v2.5.1 account new --config /parity/config.toml
```
New account credentials will be created in parity/keys/dex folder
