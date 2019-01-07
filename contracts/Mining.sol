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
	mapping(address => UserPredictions) predictionAddress;
	Prediction[] predictionArray;
	function getDifficulty() public returns(uint){
		return block.difficulty;
	}
	function setPrediction(uint date, uint difficulty, bool above) public payable{
		Prediction memory prediction = Prediction(msg.sender,msg.value,difficulty,above,date);
		predictionArray.push(prediction);
		predictionAddress[msg.sender].predictions.push(prediction);
		predictionAddress[msg.sender].length++;
	}
	function getPredictionFromAddress() internal returns (UserPredictions memory){
		return predictionAddress[msg.sender];
	}
	function getPredictionFromAddressExternal(uint index, address _address) public returns (address,uint,uint,bool,uint){
		UserPredictions memory predictionArray = getPredictionFromAddress();
		Prediction memory prediction = predictionArray.predictions[index];
		return (prediction.predicter,prediction.amount,prediction.difficultyPrediction,prediction.above,prediction.time);
	}
}