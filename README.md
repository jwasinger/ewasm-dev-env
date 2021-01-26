# ewasm-dev-env
Automation for setting up a local Geth node with EVM384 "v10" enabled.

## Requirements
* Docker, NodeJS installed on system

## Instructions
* Run a geth node:

```
./run_node.sh
```

* Send a transaction which creates a contract
```
cd example
npm install
node index.js
``` 

**Note** Make sure to delete the `geth/data` (if it exists) before restarting the client
