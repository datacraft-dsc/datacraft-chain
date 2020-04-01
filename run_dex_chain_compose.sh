export PARITY_VERSION=v2.5.1
export CONTRACTS_VERSION=v0.1
export DEPLOY_CONTRACTS="true"
export CHAIN_RPC_HOST="chain-node"
export CHAIN_RPC_PORT="8545"
export ARTIFACTS_FOLDER="./artifacts"

docker-compose --project-name=dex -f ./compose-files/contracts.yml up --remove-orphans
