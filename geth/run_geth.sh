#! /bin/bash
set -e

docker run --network host -v $(pwd)/.ethash:/root/.ethash:Z -v $(pwd)/data:/data -v $(pwd)/keys:/keys -t jwasinger/go-ethereum:evm384-v7-mulmodmont-naive \
	--etherbase $(cat keys/prefunded/prefunded-addr.txt) \
	--mine \
	--miner.threads 1 \
	--networkid 66 \
	--nodiscover \
	--vmodule "rpc=12" \
	--datadir /data \
	--unlock $(cat keys/prefunded/prefunded-addr.txt) \
	--rpc \
	--rpcaddr '127.0.0.1' \
	--rpcport 8545 \
	--rpccorsdomain '*' \
	--password /keys/prefunded/prefunded-pw.txt \
    --allow-insecure-unlock \
	--vm.ewasm="/root/libhera.so,metering=true" console
