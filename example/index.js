const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')
const argv = require('yargs').argv;
const fs = require('fs')
const request = require('request');

// prefunded account in the genesis
const privateKey = Buffer.from('cbfee4ca4db6cf6120e50eff7033ed6c65168ae4bd93bb66788ed1f50ff270fb', 'hex')
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const prefundedAddress = "7976977ecf72519e656a27c16b8c406329e46b78"

function buf2hex(buffer) { // buffer is an ArrayBuffer
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

function gen_contract_deployment(payload) {
    if (payload.length % 64 != 0) {
        payload = payload.slice(0, payload.length  - payload.length % 64) + "0".repeat(payload.length % 64) + payload.slice(-(payload.length - payload.length % 64), payload.length)
    }

    deployment_bytecode = ""

    for (let i = 0; i < payload.length; i += 64) {
        deployment_bytecode += emit([gen_push(payload.slice(i, i + 64)),
            gen_push(i),
            gen_mstore()])
    }

    deployment_bytecode += emit([
        gen_push(0),
        gen_push(payload.length),
        gen_return()
    ])

    return deployment_bytecode
}

let deploymentPayload = '0x'+buf2hex(fs.readFileSync(argv.contract))

let deploymentBytecode = gen_contract_deployment(deploymentPayload)

let nonce = web3.eth.getTransactionCount(prefundedAddress).then (nonce => {
	const txParams = {
	  nonce: '0x'+nonce,
	  gasPrice: '0x174876e8000', 
	  gasLimit: '0x47b76',
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
