const Mining = artifacts.require("../contracts/Mining.sol");

contract("Mining", accounts => {
	it("Difficulty should be a number", async () => {
		const myMining = await Mining.deployed();
		let difficulty = await myMining.getDifficulty.call();
		difficulty = difficulty.toNumber();
		assert.isAbove(difficulty, -1, "difficulty is not being accessed properly");
	})
	it("set Prediction should create a prediction", async () => {
		const myMining = await Mining.deployed();
		await myMining.setPrediction(1546885009,0,false , {from: accounts[0], value: 2000000});
		let prediction =  await myMining.getPredictionFromAddressExternal.call(0,accounts[0]);
		assert.equal(prediction[0], accounts[0], "address is not set correctly");
		assert.equal(prediction[1].toNumber(), 2000000, "amount is not set correctly");
		assert.equal(prediction[2], 0, "difficulty is not set correctly");
		assert.equal(prediction[3], false, "direction is not set correctly");
		assert.equal(prediction[4], 1546885009, "time is not set correctly");
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
		account0balance = parseInt(web3.utils.fromWei(account0balance, 'ether'));
		account1balance = parseInt(web3.utils.fromWei(account1balance, 'ether'));
		var contractBalance = await web3.eth.getBalance(myMining.address);
		assert.isAbove(account1balance,account0balance,"account 0 has not had ether taken from it");
		assert.isAbove(parseInt(contractBalance), 0, "contract has not had ether transfered to it");
	})
	it("prediction should return ether when difficulty guess is exactly right", async() => {
		const myMining = await Mining.deployed();
		await myMining.evaluatePredictions(1546885009,0);
		account0balance = await web3.eth.getBalance(accounts[0], function(err,res) {
            });
		account1balance = await web3.eth.getBalance(accounts[1], function(err,res) {
            });

		account0balance = parseInt(web3.utils.fromWei(account0balance, 'ether'));
		account1balance = parseInt(web3.utils.fromWei(account1balance, 'ether'));
		console.log(account0balance);
		console.log(account1balance);
		console.log(accounts[0]);

		assert.equal(account1balance,account0balance,"balances are not equal!");

	})
})

