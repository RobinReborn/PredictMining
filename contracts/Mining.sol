pragma solidity ^0.4.24;
contract Mining{
/*	using SafeMath for uint256;
*/	function() external payable {
	 }

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
		uint sum;
	}
	mapping(address => UserPredictions) public predictionAddress;
	mapping(uint => UserPredictions) public predictionsAtTime;
	Prediction[] public predictionArray;
	uint public predictionArrayLength;

	uint public difficulty;
	function getDifficulty() public returns(uint){
		difficulty = block.difficulty;
		return difficulty;
	}
	function setPrediction(uint date, uint difficulty, bool above) public payable{
		Prediction memory prediction = Prediction(msg.sender,msg.value,difficulty,above,date);
		predictionArray.push(prediction);
		predictionArrayLength++;
		predictionAddress[msg.sender].predictions.push(prediction);
		predictionAddress[msg.sender].length++;
		predictionsAtTime[date].predictions.push(prediction);
		predictionsAtTime[date].length++;
		predictionsAtTime[date].sum = predictionsAtTime[date].sum + msg.value;
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
	event SendEther(address sendAddress, uint amount);
	function evaluatePredictions(uint time, uint difficulty) public{
		
		//update to find correct prediction at time
		UserPredictions storage predictionsToCheck = predictionsAtTime[time];
		//require(time == predictionToCheck.time);

		uint incorrectSum=0;
		uint correctSum=0;
		address[] storage correctAddresses;
		uint correctWagers;
		uint[] storage correctWagersValues;
		for (uint i = 0; i < predictionsToCheck.length; i++){
			//this can be changed to block.difficulty in other context, like when not testing
			if (difficulty == predictionsToCheck.predictions[i].difficultyPrediction){
				address refunder = predictionsToCheck.predictions[i].predicter;
				refunder.transfer(predictionsToCheck.predictions[i].amount);
				emit Refund(refunder, predictionsToCheck.predictions[i].amount);
			}
			else if (((difficulty >= predictionsToCheck.predictions[i].difficultyPrediction) && predictionsToCheck.predictions[i].above == true) || 
		((difficulty <= predictionsToCheck.predictions[i].difficultyPrediction) && predictionsToCheck.predictions[i].above == false)) {
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
			uint winningValue = predictionsToCheck.sum/incorrectSum*correctWagersValues[j];
			emit SendEther(correctAddresses[j], winningValue);

			correctAddresses[j].send(winningValue);
		}
	}
}