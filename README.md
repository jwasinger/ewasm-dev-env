# ewasm-dev-env
Automation for setting up a local Geth node with Ewasm support.

## Requirements
* Docker installed on system

## Instructions
* Run a geth node: `./run_node.sh`
* Send an ewasm transaction to the node:
```
cd example
npm install
node index.js --wasm hello.wasm
``` 
