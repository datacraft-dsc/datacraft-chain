import json
from web3 import Web3
from solcx import compile_files, link_code, compile_source
import os
import sys
import argparse
parser = argparse.ArgumentParser(description='use --artifacts to upload contract on existing token')
parser.add_argument('--artifacts', action='store_true', help='A boolean switch')
args = parser.parse_args()
# web3.py instance
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))

def deploy_contract(contract_interface, *argv):
    # Instantiate and deploy contract
    contract = w3.eth.contract(
        abi=contract_interface['abi'],
        bytecode=contract_interface['bin']
    )
    # Get transaction hash from deployed contract
    tx_hash =contract.constructor(*argv).transact({'from':w3.eth.accounts[1]})
    # Get tx receipt to get contract address
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt['contractAddress']

zeppelin_remapping = 'openzeppelin-solidity=' + os.path.join(os.getcwd(), "node_modules/openzeppelin-solidity")
contracts = compile_files(['contracts/OceanToken.sol', 'contracts/DirectPurchase.sol'], import_remappings=[zeppelin_remapping])

token_contract = contracts.pop("contracts/OceanToken.sol:OceanToken")
purchase_contract = contracts.pop("contracts/DirectPurchase.sol:DirectPurchase")

if args.artifacts:
    with open('artifacts/OceanToken.spree.json', 'r') as f:
        token_artifact = json.load(f)

    token_address = token_artifact['address']
else:
    token_address = deploy_contract(token_contract)
print("Token contract address: ", token_address)
purchase_address = deploy_contract(purchase_contract, token_address)
print("Direct purchase contract address: ", purchase_address)

with open('artifacts/DirectPurchase.spree.json', 'w') as outfile:
    data = {
	"name": 'DirectPurchase',
        "abi": purchase_contract['abi'],
        "address": purchase_address,
	"implementation": purchase_address,
	"version": "v0.10.3"
    }
    json.dump(data, outfile, indent=4, sort_keys=True)

with open('token.json', 'w') as outfile:
    data = {
        "abi": token_contract['abi'],
        "contract_address": token_address
    }
    json.dump(data, outfile, indent=4, sort_keys=True)


