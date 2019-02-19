const http = require('http');
const fs = require('fs');
const web3 = require("web3")
const contract  = require("truffle-contract")

//from https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethcontract
const solc = require('solc');
const Web3 =  new web3(new web3.providers.WebsocketProvider('http://localhost:8545'));// import web3 v1.0 constructor
let jsonContract = fs.readFileSync('../build/contracts/Mining.json')
let abi = JSON.parse(jsonContract).abi
let address = JSON.parse(jsonContract).networks['5777'].address


let Contract = new Web3.eth.Contract(abi,address)
Contract.methods.difficulty().call({from: '0x35b4e938448433b862F4BaCb1d5Cc89638d46a83'}, 
  (err,result) => {console.log(result) })
/*let source = fs.readFileSync('../contracts/Mining.sol');
*///let compiledContract = solc.compile(source, 1).contracts[':Mining'];
//console.log(compiledContract);
//let contracts = JSON.parse(source)["Mining"];
/*var MyContract = contract(JSON.parse(MiningContract))
MyContract.setNetwork(5777);
var provider    = new Web3.providers.HttpProvider("http://localhost:8545");
MyContract.setProvider(provider);
console.log('before deployment')
*/


/*MyContract.deployed().then(function(instance) {
  console.log('test')
  //console.log(instance.getDifficulty.send())
  return 4//instance.getDifficulty.send()
})*/

/*async () => {
const myMining =  await MiningContract.deployed().then(function(instance) {
  console.log('test')
});
}*/
// ABI description as JSON structure
/*let abi = compiledContract.Mining.abi;

// Smart contract EVM bytecode as hex
let code = '0x' + contracts.Mining.bin;

// Create Contract proxy class
let Mining = web3.eth.contract(abi);

// Unlock the coinbase account to make transactions out of it
console.log("Unlocking coinbase account");
var password = "";
try {
  web3.personal.unlockAccount(web3.eth.coinbase, password);
} catch(e) {
  console.log(e);
  return;
}
*/


//let abi = compiledContract.contracts['Mining'].interface;
/*let bytecode = compiledContract.contracts['Mining'].bytecode;
let gasEstimate = web3.eth.estimateGas({data: bytecode});
//let MyContract = web3.eth.contract(JSON.parse(abi));

var myContractReturned = MyContract.new(param1, param2, {
  from:mySenderAddress,
  data:bytecode,
  gas:gasEstimate}, function(err, myContract){
   if(!err) {
      // NOTE: The callback will fire twice!
      // Once the contract has the transactionHash property set and once its deployed on an address.
       // e.g. check tx hash on the first call (transaction send)
      if(!myContract.address) {
          console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract
      
      // check address on the second call (contract deployed)
      } else {
          console.log(myContract.address) // the contract address
      }
       // Note that the returned "myContractReturned" === "myContract",
      // so the returned "myContractReturned" object will also get the address set.
   }
 });
var myContractInstance = MyContract.new({data: bytecode, gas: 300000, from: mySenderAddress});
console.log(myContractInstance.getDifficulty());*/

// use globally injected web3 to find the currentProvider and wrap with web3 v1.0
/*const getWeb3 = () => {
  const myWeb3 = new Web3(Web3.currentProvider)
  return myWeb3
}*/

// assumes passed-in web3 is v1.0 and creates a function to receive contract name
/*const getContractInstance = (web3) => (contractName) => {
  const artifact = artifacts.require(contractName) // globally injected artifacts helper
  const deployedAddress = artifact.networks[artifact.network_id].address
  const instance = new web3.eth.Contract(artifact.abi, deployedAddress)
  return instance
}*/
var schedule = require('node-schedule');
/*const web3 = getWeb3()
const getInstance = getContractInstance(web3)
const Mining = getInstance("Mining")*/
//MiningContract.setProvider(window.web3.currentProvider);
/*async () => {
const myMining =  await MiningContract.deployed();
}*/
server = http.createServer( function(req, res) {


    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        
        req.on('end', function () {
            var unixDate = parseInt(body.substring(5))/1000
            var standardDate = new Date(unixDate);
            console.log(String(unixDate));//String(parseInt(body.substring(5))/1000));
            contract.methods.evaluatePredictions(unixDate)
            .send({from: myAddress}).on('transactionHash', (hash) => {console.log(hash)});

            var j = schedule.scheduleJob('0 0 ' + String(standardDate.getDate()) + ' ' + String(standardDate.getMonth()) + '*', function(){
});
            console.log("job scheduled for " + String(standardDate.getDate()+1) + "/" + String(standardDate.getMonth()+1));
            console.log(unixDate);
            //console.log( Mining.getDifficulty.call());

        });
    }
});

port = 3001;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
