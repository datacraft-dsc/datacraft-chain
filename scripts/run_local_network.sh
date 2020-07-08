#!/bin/bash


if [ "$1" == "deploy" ]; then
    IS_DEPLOY=1
    echo "Will also deploy contracts to local network"
    npm run clean
    rm -f artifacts/artifacts.1337.json.gz
    echo "Starting up the package server"
    npm run package:server &
fi

DATA_FOLDER=local-network-data
NETWORK_FOLDER=networks/local
KEYSTORE_FOLDER=$NETWORK_FOLDER/keystore
NETWORK_ID=1337

if [ -d $DATA_FOLDER ]; then
    rm -rf $DATA_FOLDER
fi
geth init --datadir $DATA_FOLDER networks/local/genesis.json
geth \
--keystore $KEYSTORE_FOLDER \
--datadir $DATA_FOLDER \
--networkid $NETWORK_ID \
--ethash.dagdir $DATA_FOLDER \
--password $NETWORK_FOLDER/access.txt \
--unlock '0x19C2a80BE6f5fA50d4274FecdF7F4b441fB852c8,0xF3dc3d005F3e854Ce904A7bbF1e09dCe286caF64,0xd520Bc7A6024C0CAB5B02c32e760bAfBe10d58ea' \
--allow-insecure-unlock \
--rpc \
--rpcaddr '0.0.0.0' \
--rpccorsdomain '*' \
--rpcapi personal,eth,net,web3 \
--nodiscover \
--nousb \
--port 30303 \
--maxpeers 0 \
--shh \
--etherbase '0x19C2a80BE6f5fA50d4274FecdF7F4b441fB852c8' \
--mine \
--miner.gasprice 1 \
--miner.gastarget 1 \
--miner.noverify &

if [ $IS_DEPLOY ]; then
    sleep 4
    echo "Installing local contracts"
    npm run deploy:local
    echo "Completed local contracts installation"

fi
echo "Local block chain network running..."
wait





# --http
# --http.addr '0.0.0.0'
# --http.corsdomain '*'


