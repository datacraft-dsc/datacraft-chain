#!/bin/bash


# run  rinkeby node

DATA_FOLDER=local-rinkeby-data
NETWORK_FOLDER=networks/rinkeby
KEYSTORE_FOLDER=$NETWORK_FOLDER/keystore
NETWORK_ID=4

geth --datadir $DATA_FOLDER \
--rinkeby \
--networkid $NETWORK_ID
