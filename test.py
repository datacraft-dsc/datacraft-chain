import json
from web3 import Web3
from web3.contract import ConciseContract

# web3.py instance
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))

with open('token.json', 'r') as infile:
    parce = json.loads(infile.read())
abi = parce['abi']
contract_address = parce['contract_address']
token = w3.eth.contract(
    address=contract_address,
    abi=abi,
)

concise_token = ConciseContract(token)

print('Name: {}'.format(
    token.functions.name().call()
))

tx_hash = token.functions.mint(w3.eth.accounts[1],100000000000000).transact({'from': w3.eth.accounts[1]})
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

tx_hash = token.functions.mint(w3.eth.accounts[2],100000000000000).transact({'from': w3.eth.accounts[1]})
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

tx_hash = token.functions.mint(w3.eth.accounts[3],100000000000000).transact({'from': w3.eth.accounts[1]})
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

print ("Balances: ")
print('Account 1: {}'.format(
    token.functions.balanceOf(w3.eth.accounts[1]).call()
))

print('Account 2: {}'.format(
    token.functions.balanceOf(w3.eth.accounts[2]).call()
))

print('Account 3: {}'.format(
    token.functions.balanceOf(w3.eth.accounts[3]).call()
))

with open('purchase.json', 'r') as infile:
    parce = json.loads(infile.read())
abi = parce['abi']
purchase_address = parce['contract_address']
purchase_contract = w3.eth.contract(
    address=purchase_address,
    abi=abi,
)

concise_purchase = ConciseContract(purchase_contract)

tx_hash = concise_purchase.sendTokenAndLog(w3.eth.accounts[3], 0, Web3.toBytes(50), Web3.toBytes(50), transact = {'from': w3.eth.accounts[2]})
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
print('Transaction log: {}'.format(tx_receipt['logs'][0]['data']))


print ("Balances: ")
print('Account 1: {}'.format(
    token.functions.balanceOf(w3.eth.accounts[1]).call()
))

print('Account 2: {}'.format(
    token.functions.balanceOf(w3.eth.accounts[2]).call()
))

print('Account 3: {}'.format(
    token.functions.balanceOf(w3.eth.accounts[3]).call()
))


