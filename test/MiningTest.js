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
		await myMining.setPrediction(1546885009,0,false , {from: accounts[0], value: 10});
		//assert.isEqual()
		let prediction =  await myMining.getPredictionFromAddressExternal(0,{from: accounts[0]})
		console.log(prediction[1]);
		assert.isEqual(prediction[0], 1546885009, "time is not set correctly");
		assert.isEqual(prediction[1], 0, "difficulty is not set correctly");
		assert.isEqual(prediction[2], false, "direction is not set correctly");
		assert.isEqual(prediction[3], accounts[0], "address is not set correctly");
	})
})

