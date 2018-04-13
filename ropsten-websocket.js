window.LogData = function getData() { 
	results = [{}];

	const Web3 = require('web3');

	const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
	var abi = [ { "constant": false, "inputs": [ { "name": "_username", "type": "string" } ], "name": "createTweetWallet", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_username", "type": "string" }, { "indexed": false, "name": "_address", "type": "address" } ], "name": "TweetWalletCreated", "type": "event" } ];

	var contract = new web3.eth.Contract(abi,'0xf396316bD6DE45Dd85F8C465715798Bf13C46E26');

	contract.getPastEvents('allEvents',
	    {fromBlock: 0,  toBlock: 'latest'},
	    (error, logs) => {
	        if (error) console.error(error);
	        // logs.forEach(log => {
	     
	        // })
	    }).then(function(logs){
	    	logs.forEach(log => {
	            results.push(log);
	        })    
		});

	return new Promise(resolve => {
	    setTimeout(() => {
	      resolve(results);
	    }, 1000);
	  });

}

window.GetBalances = function getData(addresses) { 
	const Web3 = require('web3');
	const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
	
	var balances = [];

	for (var i = 0; i < addresses.length; i++) {
		web3.eth.getBalance(addresses[i], function(error, result){
	    if(!error) {
	    	var formattedAsEth = web3.utils.fromWei(result,'ether');
	    	balances.push(formattedAsEth);
	    }
	    else {
	        console.error(error);
	    }
	});
	}

	return new Promise(resolve => {
	    setTimeout(() => {
	      resolve(balances);
	    }, 1000);
  	});
}

