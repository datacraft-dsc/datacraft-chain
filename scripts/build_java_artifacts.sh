#!/bin/bash

# Build Java library
CONTRACT_LIST=("DIDRegistry" "DexToken" "DirectPurchase" "Dispenser" "Provenance")

JAVA_LIB_PATH_NAME=sg.dex.starfish.dexchain.impl
DESTINATION_FOLDER=build/src/main/java

echo "installing web3j"
curl -L https://get.web3j.io | sh


for CONTRACT_NAME in ${CONTRACT_LIST[@]}; do
    echo "Building artifact $CONTRACT_NAME"
    $HOME/.web3j/web3j truffle generate --javaTypes ./build/contracts/${CONTRACT_NAME}.json -o $DESTINATION_FOLDER -p $JAVA_LIB_PATH_NAME
done

