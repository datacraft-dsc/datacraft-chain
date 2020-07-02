#!/bin/bash

# start_dex_chain.sh


function show_help {
cat  << EOT

start_dex_chain.sh  [options] <command>

Start the dex chain or local private network.

Command can be one of the following:

local                   Start a local private network

test                    Start a local private network and also install the contracts on the local network.
                        The same as 'start_dex_chain.sh --install local'.

Options:

--docker=<DOCKER_NAME>                  Docker image name. Default: 'dex-chain'.
--dry-run                       -d      Run without executing an scripts or docker container.
--install                       -i      Allways install the contracts on the local private network.
--naitive                       -n      Run the chain/network without using docker
--publish                       -p      List of ports to publish in docker. Default: '8545:8545,8550:8550'.

EOT
}

COMMAND=()
DOCKER_NAME="dex-chain"
PUBLISH_PORTS="8545:8545,8550:8550"


# parse args
while [[ $# -gt 0 ]]; do
    ARG="$1"
    case $ARG in
        --docker)
        DOCKER_NAME="$2"
        shift
        shift
        ;;
        -d|--dry-run)
        IS_DRY_RUN=1
        shift
        ;;
        -i|--install)
        IS_INSTALL=1
        shift
        ;;
        -n|--native)
        IS_NATIVE=1
        shift
        ;;
        -p|--publish)
        PUBLISH_PORTS="$2"
        shift
        shift
        ;;
        *)
        COMMAND+=("$1")
        shift
        ;;
    esac
done

# check for no command given
if [ -z $COMMAND ]; then
    echo "No command provided."
    show_help
    exit
fi

# parse command
case $COMMAND in
    local)
    ;;
    test)
    IS_INSTALL=1
    COMMAND=local
    ;;
    *)
    echo "Unknown command '$COMMAND'"
    show_help
    exit
    ;;
esac

# create basic script line
SCRIPT_LINE='./scripts/run_local_network.sh'
if [ $IS_INSTALL ]; then
    SCRIPT_LINE="$SCRIPT_LINE install"
fi

# if no - docker then, execute script directly
if [ $IS_NATIVE ]; then
    if [ IS_DRY_RUN ]; then
        echo "Will execute: $SCRIPT_LINE"
        exit
    fi
    $SCRIPT_LINE
    exit
fi


if [ ! -z "$PUBLISH_PORTS" ]; then
    PUBLISH_PORT_LIST="--publish ${PUBLISH_PORTS//,/ --publish }"
fi


# setup docker and execute script line in docker
DOCKER_LINE="docker run $PUBLISH_PORT_LIST $DOCKER_NAME $SCRIPT_LINE"
if [ $IS_DRY_RUN ]; then
    echo "Will execute: $DOCKER_LINE"
    exit
fi
$DOCKER_LINE

