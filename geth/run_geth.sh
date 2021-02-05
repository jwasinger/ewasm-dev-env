#! /bin/bash
set -e

docker run --network host -v $(pwd)/.ethash:/root/.ethash:Z -v $(pwd)/data:/data -v $(pwd)/keys:/keys -d -t jwasinger/go-ethereum:master \
	--etherbase $(cat keys/prefunded/prefunded-addr.txt) \
	--mine \
	--miner.threads 1 \
	--networkid 66 \
	--nodiscover \
	--datadir /data \
	--unlock $(cat keys/prefunded/prefunded-addr.txt) \
	--password /keys/prefunded/prefunded-pw.txt \
    --allow-insecure-unlock \
    --rpc \
    --rpcaddr '127.0.0.1' \
    --rpcport 8545 \
    --rpccorsdomain '*'
