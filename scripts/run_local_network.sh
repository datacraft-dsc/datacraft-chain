#!/bin/bash

DATA_FOLDER=local-network-data
NETWORK_ID=1337

if [ -d $DATA_FOLDER ]; then
    rm -rf $DATA_FOLDER
fi
geth init --datadir $DATA_FOLDER networks/local/genesis.json
cp networks/local/keystore/*.json $DATA_FOLDER/keystore
geth --datadir $DATA_FOLDER \
--networkid $NETWORK_ID \
--password <(echo dex-secret) \
--unlock '0xB4CB6E576409e0CbA1ae44Bd68B6F9551987AFee' \
--allow-insecure-unlock \
--http \
--http.addr '127.0.0.1' \
--http.corsdomain '*' \
--nodiscover \
--nousb \
--port 39393 \
--maxpeers 0 \
--shh \
--mine \
--miner.gasprice 1 \
--miner.gastarget 1 \
--miner.noverify



