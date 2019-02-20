const http = require('http');
const fs = require('fs');
const web3 = require("web3")
const contract  = require("truffle-contract")

//from https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethcontract
const solc = require('solc');
const Web3 =  new web3(new web3.providers.WebsocketProvider('http://localhost:8545'));// import web3 v1.0 constructor
let jsonContract = fs.readFileSync('../build/contracts/Mining.json')
let abi = JSON.parse(jsonContract).abi
let contractAddress = JSON.parse(jsonContract).networks['5777'].address
let myAddress = '0x35b4e938448433b862F4BaCb1d5Cc89638d46a83'

let Contract = new Web3.eth.Contract(abi,contractAddress)
Contract.methods.difficulty().call({from: myAddress}, 
  (err,result) => {console.log(result) })

var schedule = require('node-schedule');

server = http.createServer( function(req, res) {


    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        
        req.on('end', function () {
            var unixDate = parseInt(body.substring(5))*1000
            var standardDate = new Date(unixDate);
            console.log(String(unixDate));//String(parseInt(body.substring(5))/1000));
            Contract.methods.evaluatePredictions(unixDate,1)
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
