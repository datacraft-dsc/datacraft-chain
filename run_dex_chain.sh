docker run -p 8545:8545 -p 8546:8546 -p 30303:30303 -p 30303:30303/udp -v $PWD/parity:/parity parity/parity:v2.5.1 --config /parity/config.toml
