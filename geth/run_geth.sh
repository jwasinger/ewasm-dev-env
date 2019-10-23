#! /bin/bash
set -e

docker run -d --network host -v $(pwd)/.ethash:/root/.ethash:Z -v $(pwd)/data:/data -v $(pwd)/keys:/keys -t localhost/client-go:ewasm \
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
	--ws \
	--wsaddr '0.0.0.0' \
	--wsorigins '*' \
	--password /keys/prefunded/prefunded-pw.txt \
	--vm.ewasm="/root/libhera.so,metering=false" \
 --vmodule "rpc=5,core/vm=5"
