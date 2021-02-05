Reproduces https://github.com/trufflesuite/truffle/issues/3437

## Requirements
* Docker installed on system

## Instructions
* Run a geth node:

```
./run_node.sh
```

* initiate migration of metacoin example:
```
cd MetaCoin && npx truffle migrate
```  
