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
# uncomment needed network ./truffle-config.js
```
## To compile and deploy with Truffle
```
truffle compile
trufle migrate
# or to re-build from scratch:
truffle migrate --reset --compile-all
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
