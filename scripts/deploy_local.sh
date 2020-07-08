#!/bin/bash

#  deploy local

npm run clean
rm -f .openzeppelin/dev-1337.json

export DEX_CHAIN_MNEMONIC="winner soccer news orphan banner vicious swarm obtain dash cradle print outer"

npx oz compile
npx oz push --deploy-dependencies --network local
node_modules/.bin/truffle migrate --network local

