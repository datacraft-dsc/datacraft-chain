FROM node:10-alpine
MAINTAINER <ilyabukalov@gmail.com>

ENV LOCAL_CONTRACTS='true'

WORKDIR /deployment

COPY package-lock.json /deployment/package-lock.json
COPY package.json /deployment/package.json

RUN npm install --save-exact truffle
RUN npm install --save-exact openzeppelin-solidity

COPY truffle-config.js /deployment/truffle-config.js
COPY patch.sh /deployment/patch.sh
COPY contracts/DirectPurchase.sol /deployment/contracts/DirectPurchase.sol
COPY contracts/Migrations.sol /deployment/contracts/Migrations.sol
COPY migrations/2_purchase.js /deployment/migrations/1_purchase.js

CMD ./patch.sh
