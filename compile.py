import json
from web3 import Web3
from solcx import compile_files, link_code, compile_source
# web3.py instance
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))

def deploy_contract(contract_interface, *argv):
    # Instantiate and deploy contract
    contract = w3.eth.contract(
        abi=contract_interface['abi'],
        bytecode=contract_interface['bin']
    )
    # Get transaction hash from deployed contract
    tx_hash = contract.deploy(args=[*argv], transaction={'from':w3.eth.accounts[1]})
    # Get tx receipt to get contract address
    tx_receipt = w3.eth.getTransactionReceipt(tx_hash)
    return tx_receipt['contractAddress']

# compile all contract files
contracts = compile_files(['token.sol', 'DirectPurchase.sol'])
token_contract = contracts.pop("token.sol:OceanToken")
purchase_contract = contracts.pop("DirectPurchase.sol:DirectPurchase")
token_address = deploy_contract(token_contract)
print("Token contract address: ", token_address)
purchase_address = deploy_contract(purchase_contract, token_address)
print("Direct purchase contract address: ", purchase_address)

with open('purchase.json', 'w') as outfile:
    data = {
        "abi": purchase_contract['abi'],
        "contract_address": purchase_address
    }
    json.dump(data, outfile, indent=4, sort_keys=True)

with open('token.json', 'w') as outfile:
    data = {
        "abi": token_contract['abi'],
        "contract_address": token_address
    }
    json.dump(data, outfile, indent=4, sort_keys=True)


