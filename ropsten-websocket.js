#!/usr/bin/env node
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
var abi = [ { "constant": false, "inputs": [ { "name": "_username", "type": "string" } ], "name": "createTweetWallet", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_username", "type": "string" }, { "indexed": false, "name": "_address", "type": "address" } ], "name": "TweetWalletCreated", "type": "event" } ];

var contract = new web3.eth.Contract(abi,'0xf396316bD6DE45Dd85F8C465715798Bf13C46E26');

contract.getPastEvents('allEvents',
    {fromBlock: 0,  toBlock: 'latest'},
    (error, logs) => {
        if (error) console.error(error);
        logs.forEach(log => {
            console.log(log.returnValues._username);
            console.log(log.returnValues._address);
        })
    });
