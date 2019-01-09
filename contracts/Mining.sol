pragma solidity ^0.4.24;

contract Mining{
	struct Prediction {
		address predicter;
		uint amount;
		uint difficultyPrediction;
		bool above;
		uint time;
	}
	struct UserPredictions {
		Prediction[] predictions;
		uint length;
	}
	mapping(address => UserPredictions) public predictionAddress;
	mapping(uint => UserPredictions) public predictionsAtTime;
	Prediction[] public predictionArray;
	function getDifficulty() public returns(uint){
		return block.difficulty;
	}
	function setPrediction(uint date, uint difficulty, bool above) public payable{
		Prediction memory prediction = Prediction(msg.sender,msg.value,difficulty,above,date);
		predictionArray.push(prediction);
		predictionAddress[msg.sender].predictions.push(prediction);
		predictionAddress[msg.sender].length++;
		predictionsAtTime[date].predictions.push(prediction);
		predictionsAtTime[date].length++;
	}
	function getPredictionFromAddress() internal returns (UserPredictions memory){
		return predictionAddress[msg.sender];
	}
	function getPredictionFromAddressExternal(uint index, address _address) public returns (address,uint,uint,bool,uint){
		UserPredictions memory predictionArray = getPredictionFromAddress();
		Prediction memory prediction = predictionArray.predictions[index];
		return (prediction.predicter,prediction.amount,prediction.difficultyPrediction,prediction.above,prediction.time);
	}
	event Refund(address refundAddress, uint amount);
	function evaluatePredictions(uint time, uint difficulty) public{
		
		//update to find correct prediction at time
		UserPredictions storage predictionsToCheck = predictionsAtTime[time];
		//require(time == predictionToCheck.time);

		uint incorrectSum;
		uint correctSum;
		address[] storage correctAddresses;
		uint correctWagers;
		uint[] storage correctWagersValues;
		for (uint i = 0; i < predictionsToCheck.length; i++){
			//this can be changed to block.difficults in other context, like when not testing
			if (difficulty == predictionsToCheck.predictions[i].difficultyPrediction){
				address refunder = predictionsToCheck.predictions[i].predicter;
				refunder.transfer(predictionsToCheck.predictions[i].amount);
				Refund(refunder, predictionsToCheck.predictions[i].amount);
			}
			else if (((block.difficulty >= predictionsToCheck.predictions[i].difficultyPrediction) && predictionsToCheck.predictions[i].above == true) || 
		((block.difficulty <= predictionsToCheck.predictions[i].difficultyPrediction) && predictionsToCheck.predictions[i].above == false)) {
				correctSum = correctSum + predictionsToCheck.predictions[i].amount;
				correctAddresses.push(predictionsToCheck.predictions[i].predicter);
				correctWagersValues.push(predictionsToCheck.predictions[i].amount);
				correctWagers++;
			}
			else {
				incorrectSum = incorrectSum + predictionsToCheck.predictions[i].amount;
			}
		}
		for(uint j=0; j < correctWagers; j++){
			uint winningValue = incorrectSum*(correctWagersValues[j]/incorrectSum+correctSum);
			correctAddresses[j].send(winningValue);
		}
	}
}