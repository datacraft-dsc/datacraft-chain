#!/bin/bash

if [ -z "$1" ]; then
    echo "Please provide a node name ( rinkeby, ropsten )"
    exit
fi

ARG="$1"
case $ARG in
    rinkeby)
    NETWORK_NAME="$ARG"
    NETWORK_ID=4
    ;;
    ropsten)
    NETWORK_NAME="$ARG"
    NETWORK_ID=3
    ;;
    *)
    echo "invalid network name $ARG"
    exit
    ;;
esac
# run test node

DATA_FOLDER=local-${NETWORK_NAME}-data
NETWORK_FOLDER=networks/${NETWORK_NAME}
KEYSTORE_FOLDER=$NETWORK_FOLDER/keystore

geth --datadir=$DATA_FOLDER \
--${NETWORK_NAME} \
--networkid=$NETWORK_ID \
--cache=512
