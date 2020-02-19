FROM node:10-alpine
MAINTAINER <ilyabukalov@gmail.com>

ENV LOCAL_CONTRACTS='true'

WORKDIR /deployment

COPY package-lock.json /deployment/package-lock.json
COPY package.json /deployment/package.json

RUN apk add --no-cache git python make g++
RUN npm install --save-exact truffle
RUN npm install --save-exact @openzeppelin/cli
RUN npm install --save-exact @openzeppelin/upgrades
RUN npm install --save-exact @openzeppelin/contracts-ethereum-package
COPY .openzeppelin/ /deployment/.openzeppelin/


COPY truffle-config.js /deployment/truffle-config.js
COPY patch.sh /deployment/patch.sh
COPY contracts/DirectPurchase.sol /deployment/contracts/DirectPurchase.sol
COPY contracts/DIDRegister.sol /deployment/contracts/DIDRegister.sol
COPY contracts/Migrations.sol /deployment/contracts/Migrations.sol
COPY migrations/2_purchase.js /deployment/migrations/1_purchase.js
COPY migrations/3_registry.js /deployment/migrations/2_registry.js
COPY migrations/4_provenance.js /deployment/migrations/3_provenance.js
COPY contracts/Provenance.sol /deployment/contracts/Provenance.sol

CMD ./patch.sh
