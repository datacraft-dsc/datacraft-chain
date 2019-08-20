FROM node:10-alpine
MAINTAINER <ilyabukalov@gmail.com>

ENV LOCAL_CONTRACTS='true'

WORKDIR /deployment

COPY package-lock.json /deployment/package-lock.json
COPY package.json /deployment/package.json
COPY contracts /deployment/contracts
COPY migrations /deployment/migrations
COPY patch.sh /deployment/patch.sh
COPY truffle-config.js /deployment/truffle-config.js

RUN npm install --save-exact truffle
RUN npm install --save-exact openzeppelin-solidity

CMD ./patch.sh




