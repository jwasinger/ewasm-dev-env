# ewasm-dev-env
Automation for setting up a local Geth node with Ewasm support.

## Requirements
* Docker, NodeJS installed on system

## Instructions
* Run a geth node:

```
(cd geth && docker build -t localhost/client-go:ewasm .)
./run_node.sh
```

* Send a transaction which creates a contract
```
cd example
npm install
node index.js --wasm contraction-creation.wasm
``` 

**Note** Make sure to delete the `geth/data` (if it exists) before restarting the client
