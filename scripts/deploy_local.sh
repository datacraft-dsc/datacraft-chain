#!/bin/bash

# test new deploy script

CONTRACT_LIST=("DIDRegistry" "DexToken" "DirectPurchase" "Dispenser" "Provenance")

npm run clean
rm -f .openzeppelin/dev-1337.json



npx oz compile
npx oz push --deploy-dependencies --network local
node_modules/.bin/truffle migrate --network local

exit

# for CONTRACT_NAME in ${CONTRACT_LIST[@]}; do
#      echo "Deploying $CONTRACT_NAME"
#      npx oz deploy ${CONTRACT_NAME} --network local --kind upgradeable
# done
