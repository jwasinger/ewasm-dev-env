const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

// prefunded account in the genesis
const privateKey = Buffer.from('cbfee4ca4db6cf6120e50eff7033ed6c65168ae4bd93bb66788ed1f50ff270fb', 'hex')

const argv = require('yargs').argv;
const fs = require('fs')
const binaryen = require("binaryen");
const request = require('request');
const wabt = require("wabt")();
const tmp = require('tmp');
const Readable = require('stream').Readable;
const s = new Readable();

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const DEPLOYMENT_ADDRESS = "7976977ecf72519e656a27c16b8c406329e46b78"

function buf2hex(buffer) { // buffer is an ArrayBuffer
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

/*
function createTruffleConf(receipt, bytecode) {
	let conf_template = fs.readFileSync("truffle/WRC20.template.json", "utf-8")
	let conf = conf_template.replace(/DEPLOYED_BYTECODE/, bytecode).replace(/DEPLOYED_ADDRESS/, receipt.contractAddress).replace(/DEPLOYED_TX_HASH/, receipt.transactionHash);
	conf = Buffer.from(conf, 'utf-8');
	
	if (fs.existsSync("truffle/build/contracts/WRC20.json")) {
		fs.unlinkSync("truffle/build/contracts/WRC20.json")
	}

	fs.writeFileSync("truffle/build/contracts/WRC20.json", conf);
}
*/

//let wasmBytecode = buf2hex(binaryen.readBinary(Uint8Array.from(fs.readFileSync(argv.wasm))).emitBinary()) //buf2hex(fs.readFileSync(argv.wasm));
//let wasmBytecode = buf2hex(fs.readFileSync(argv.wasm))

let wasmBytecode = buf2hex(fs.readFileSync(argv.wasm))

let deploymentBytecode = '0x'+wasmBytecode

let nonce = web3.eth.getTransactionCount(DEPLOYMENT_ADDRESS).then (nonce => {
	const txParams = {
	  nonce: '0x'+nonce,
	  gasPrice: '0x174876e8000', 
	  gasLimit: '0x700000',
	  to: '',
	  value: '', 
	  data: deploymentBytecode,
	  chainId: 66
	}

	let tx = new EthereumTx(txParams)
	tx.sign(privateKey)
	let serializedTx = tx.serialize()

	console.log("sending signed transaction...")
	web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
		.on('receipt', function(receipt) {
			console.log("got tx receipt: ", receipt)
		})
		.on('error', function(err) {
			console.log(err)
		});
});
