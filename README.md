# Direct purchase using Ocean token

## Install Solidity compiler for Ubuntu
```
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install solc
```
## Install Truffle
```
sudo npm init -y
sudo npm install --save-exact truffle
sudo npm install --save-exact openzeppelin-solidity
truffle init
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
pip3 install web3
pip3 install py-solc-x
python -m solcx.install v0.5.6
```
## To compile and deploy with Python
```
python compile.py
```
