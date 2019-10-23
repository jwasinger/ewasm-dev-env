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

* Send an ewasm transaction to the node:
```
cd example
npm install
node index.js --wasm hello.wasm
``` 

**Note** Make sure to delete the `geth/data` (if it exists) before restarting the client
