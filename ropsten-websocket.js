window.LogData = function getData() { 
	results = [{}];

	const Web3 = require('web3');

	const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
	var abi = [ { "constant": false, "inputs": [ { "name": "_username", "type": "string" } ], "name": "createTweetWallet", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_username", "type": "string" }, { "indexed": false, "name": "_address", "type": "address" } ], "name": "TweetWalletCreated", "type": "event" } ];

	var contract = new web3.eth.Contract(abi,'0x16336fdb880c8c5d00c41c11dbd3a729bfd622fc');

	contract.getPastEvents('allEvents',
	    {fromBlock: 0,  toBlock: 'latest'},
	    (error, logs) => {
	        if (error) console.error(error);
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

window.CreateTweetWallet = function createTweetWallet(username) { 
	results = [{}];

	console.log(username);

	var web3;

	const Web3 = require('web3');
	    if (typeof web3 !== 'undefined') {
	        web3 = new Web3(web3.currentProvider);
	    } else {
	        App.web3Provider = new Web3(window.web3.currentProvider);
	        web3 = new Web3(App.web3Provider);
	    }

    web3.eth.getAccounts(function (error, accounts) {
         if (error) {
            alert('It looks like you are not logged into the MetaMask browser plugin. To use TweetTip.me, please connect to the Ethereum network with Metamask, metamask.io');
        }

        if (accounts.length == 0) {
            alert('Please connect to the Ethereum mainnet with the MetaMask browser extension, or use a service such as MyEtherWallet');
            return;
        } else {
            var account = accounts[0];
        }

        var account = accounts[0];
		var abi = [ { "constant": false, "inputs": [ { "name": "_username", "type": "string" } ], "name": "createTweetWallet", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_username", "type": "string" }, { "indexed": false, "name": "_address", "type": "address" } ], "name": "TweetWalletCreated", "type": "event" } ];
<<<<<<< HEAD
		var contract = new web3.eth.Contract(abi,'0x16336fdb880c8c5d00c41c11dbd3a729bfd622fc', {from: account});
=======
		var contract = new web3.eth.Contract(abi,'0x7affb490fec3793ab370dfbd45db4cd9f9f3f6b9', {from: account});
>>>>>>> 011dc16e08328b1322bc3c2d1e747be34fc7f166

        contract.methods.createTweetWallet(username).send({from: account})
			.on('error', function(error){ alert('Your transaction had an error :( Here is some more information - ' +  error); })
			.on('transactionHash', function(transactionHash){ alert('Your transaction is processing with transaction ID - ' +  transactionHash);})
			// .on('receipt', function(receipt){ alert('Your Tip has been registered on the blockchain at this contract address: ' + receipt.contractAddress) })
			.then(function(newContractInstance){
			    console.log(newContractInstance.options.address) 
			});
    });

}

window.ClaimEther = function claimEther(statusID, contractAddress) { 
	results = [{}];

	var web3;

	const Web3 = require('web3');
	    if (typeof web3 !== 'undefined') {
	        web3 = new Web3(web3.currentProvider);
	    } else {
	        App.web3Provider = new Web3(window.web3.currentProvider);
	        web3 = new Web3(App.web3Provider);
	    }

    web3.eth.getAccounts(function (error, accounts) {
         if (error) {
            alert('It looks like you are not logged into the MetaMask browser plugin. To use TweetTip.me, please connect to the Ethereum network with Metamask, metamask.io');
        }

        if (accounts.length == 0) {
            alert('Please connect to the Ethereum mainnet with the MetaMask browser extension, or use a service such as MyEtherWallet');
            return;
        } else {
            var account = accounts[0];
        }

        var account = accounts[0];

        var abi = [{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"},{"name":"proof","type":"bytes"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"username","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getUsername","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"refundOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_statusId","type":"string"}],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_username","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"description","type":"string"}],"name":"newOraclizeQuery","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tweetInfo","type":"string"}],"name":"newTweetInfo","type":"event"}];
            
        var contract = new web3.eth.Contract(abi,contractAddress, {from: account});


        contract.methods.claim(statusID).send({from: account, value:1000000000000000}	)
            .on('error', function(error){ alert('Your transaction had an error :( Here is some more information - ' +  error); })
            .on('transactionHash', function(transactionHash){ alert('Your transaction is processing with transaction ID - ' +  transactionHash);})
            .then(function(newContractInstance){
                console.log("got here") 
                $('#claimModal').modal('toggle');
                $('#balances-table').find("tr:gt(0)").remove();
            });
    });
	
}

}