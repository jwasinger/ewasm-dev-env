#! /bin/bash

mkdir data
docker run -v $(pwd)/genesis.json:/genesis.json -v $(pwd)/data:/data -t localhost/client-go:ewasm init /genesis.json --datadir /data
docker run -v $(pwd)/keys:/keys -v $(pwd)/data:/data -t localhost/client-go:ewasm --datadir /data account import /keys/prefunded/prefunded-priv.txt --password /keys/prefunded/prefunded-pw.txt
