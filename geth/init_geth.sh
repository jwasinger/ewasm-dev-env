#! /bin/bash

mkdir data
docker run -v $(pwd)/genesis.json:/genesis.json -v $(pwd)/data:/data -t jwasinger/go-ethereum:evm384-v7-mulmodmont-naive init /genesis.json --datadir /data
docker run -v $(pwd)/keys:/keys -v $(pwd)/data:/data -t jwasinger/go-ethereum:evm384-v7-mulmodmont-naive --datadir /data account import /keys/prefunded/prefunded-priv.txt --password /keys/prefunded/prefunded-pw.txt
