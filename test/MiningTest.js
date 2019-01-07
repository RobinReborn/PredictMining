const Mining = artifacts.require("../contracts/Mining.sol");

contract("Mining", accounts => {
	it("Difficulty should be a number", async () => {
		const myMining = await Mining.deployed();
		let difficulty = await myMining.getDifficulty.call();
		//console.log(difficulty)
		difficulty = difficulty.toNumber();
		assert.isAbove(difficulty, -1, "difficulty is not being accessed properly");
	})
	it("set Prediction should create a prediction", async () => {
		const myMining = await Mining.deployed();
		await myMining.setPrediction(1546885009,0,false , {from: accounts[0], value: 20000000});
		//assert.isEqual()
		let prediction =  await myMining.getPredictionFromAddressExternal.call(0,accounts[0]);
		console.log(prediction);
		assert.equal(prediction[0], accounts[0], "address is not set correctly");
		assert.equal(prediction[1].toNumber(), 20000000, "amount is not set correctly");
		assert.equal(prediction[2], 0, "difficulty is not set correctly");
		assert.equal(prediction[3], false, "direction is not set correctly");
		assert.equal(prediction[4], 1546885009, "time is not set correctly");

	})
})

