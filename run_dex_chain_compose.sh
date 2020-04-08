export PARITY_VERSION=v2.5.1
export CONTRACTS_VERSION=v0.2
export DEPLOY_CONTRACTS="true"
export CHAIN_RPC_HOST="chain-node"
export CHAIN_RPC_PORT="8545"
export ARTIFACTS_FOLDER="${PWD}/artifacts"


docker-compose --project-name=dex -f ./compose-files/contracts.yml -f ./compose-files/network.yml -f ./compose-files/chain.yml up --remove-orphans
