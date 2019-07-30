const Mining = artifacts.require("../contracts/Mining.sol");
const truffleAssert = require('truffle-assertions');
var utils = require("./utils.js");

contract("Mining", accounts => {
	it("Difficulty should be a number", async () => {
		const myMining = await Mining.deployed();
		let difficulty = await myMining.getDifficulty.call();
		difficulty = difficulty.toNumber();
		assert.isAbove(difficulty, -1, "difficulty is not being accessed properly");
	})
	it("set Prediction should create a prediction", async () => {
		const myMining = await Mining.deployed();
		let tx = await myMining.setPrediction(1546885009,0,false , {from: accounts[0], value: 2000000});
		let prediction =  await myMining.getPredictionFromAddressExternal.call(0,accounts[0]);
		assert.equal(prediction[0], accounts[0], "address is not set correctly");
		assert.equal(prediction[1].toNumber(), 2000000, "amount is not set correctly");
		assert.equal(prediction[2], 0, "difficulty is not set correctly");
		assert.equal(prediction[3], false, "direction is not set correctly");
		assert.equal(prediction[4], 1546885009, "time is not set correctly");
		truffleAssert.eventEmitted(tx, "predictionMade")
	})
	it("prediction should be added to array", async() => {
		const myMining = await Mining.deployed();
		let predictionArray = await myMining.predictionArray.call(0);
		assert.equal(predictionArray[0], accounts[0], "address is not set correctly");
		assert.equal(predictionArray[1].toNumber(), 2000000, "amount is not set correctly");
		assert.equal(predictionArray[2], 0, "difficulty is not set correctly");
		assert.equal(predictionArray[3], false, "direction is not set correctly");
		assert.equal(predictionArray[4], 1546885009, "time is not set correctly");
	})
	it("account should have less ether", async() => {
		const myMining = await Mining.deployed();
		let account0Balance, account1Balance;
		account0balance = await web3.eth.getBalance(accounts[0], function(err,res) {
            });
		account1balance = await web3.eth.getBalance(accounts[1], function(err,res) {
            });
		account0balance = parseInt(web3.utils.fromWei(account0balance, 'lovelace'));
		account1balance = parseInt(web3.utils.fromWei(account1balance, 'lovelace'));
		var contractBalance = await web3.eth.getBalance(myMining.address);
		assert.isAbove(account1balance,account0balance,"account 0 has not had ether taken from it");
		assert.isAbove(parseInt(contractBalance), 0, "contract has not had ether transfered to it");
	})
	it("prediction should return ether when difficulty guess is exactly right", async() => {
		const myMining = await Mining.deployed();
		balancebefore = await web3.eth.getBalance(accounts[0], function(err,res) {
          });

		await myMining.simulateEvaluatePredictions(1546885009,0);
		balanceafter = await web3.eth.getBalance(accounts[0], function(err,res) {
          });

		balanceafter = parseInt(web3.utils.fromWei(balanceafter, 'lovelace'));
		balancebefore = parseInt(web3.utils.fromWei(balancebefore, 'lovelace'));
		console.log(balancebefore);
		console.log(balanceafter);

		assert.isAbove(balancebefore,balanceafter,"balances are not equal!");

	})
	it("ether from incorrect account should flow into correct account", async() => {
		const myMining = await Mining.deployed();

		await myMining.setPrediction(1546885009,0,false , {from: accounts[0], value: 200000});
		await myMining.setPrediction(1546885009,2,true , {from: accounts[1], value: 200000});
		await myMining.simulateEvaluatePredictions(1546885009,5);
		account0balance = await web3.eth.getBalance(accounts[0], function(err,res) {
            });
		account1balance = await web3.eth.getBalance(accounts[1], function(err,res) {
            });
		account0balance = parseInt(web3.utils.fromWei(account0balance, 'lovelace'));
		account1balance = parseInt(web3.utils.fromWei(account1balance, 'lovelace'));

		console.log(account0balance);
		console.log(account1balance);
		assert.isAbove(account1balance,account0balance,"account 0 has not transfered ether to account 1");



	})
})

