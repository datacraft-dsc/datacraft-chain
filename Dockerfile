FROM node:14-alpine
MAINTAINER <ilyabukalov@gmail.com>

ENV HOME=/home/dex-chain
EXPOSE 8545

WORKDIR $HOME
ADD . $HOME

RUN apk add --no-cache git bash make g++ geth
RUN npm install

# CMD $HOME/scripts/run_local_network.sh
