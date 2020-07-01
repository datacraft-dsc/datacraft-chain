#!/bin/bash

DATA_FOLDER=local-network-data
KEYSTORE_FOLDER=networks/local/keystore
NETWORK_ID=1337

if [ -d $DATA_FOLDER ]; then
    rm -rf $DATA_FOLDER
fi
geth init --datadir $DATA_FOLDER networks/local/genesis.json
geth \
--keystore $KEYSTORE_FOLDER \
--datadir $DATA_FOLDER \
--networkid $NETWORK_ID \
--password $KEYSTORE_FOLDER/access.txt \
--unlock '0x32F098d6965ef0164151162787C69219F6D333dB,0xB4CB6E576409e0CbA1ae44Bd68B6F9551987AFee,0x8D5606e48c385CF8E4198439Fa4cDF42B4DBb8C8' \
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



