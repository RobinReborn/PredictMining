import React from "react";

class SetPrediction extends React.Component {
	  constructor(props) {
	    super(props);
	    this.handleSubmit = this.handleSubmit.bind(this);
	   	this.state = { date:'', difficulty:0, above:false, ether:0 };



  }

	//this could be set to autopopulate current date or date in near future and current difficulty
	/*function makePrediction(){
		myMining.setPrediction(1546885009,0,false , {from: accounts[0], value: 2000000});
	}*/
	  handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

handleSubmit() {
	var con = this.props.drizzle.contracts.Mining
	con.methods.setPrediction.cacheSend(this.state.date,this.state.difficulty,this.state.above,
		{value: this.state.ether});
}
	/*handlepredictionDateChange: function(e) {
		this.setState({date: e.target.value});
	},
	handlepredictionDifficulty: function(e) {
		this.setState({difficulty: e.target.value});
	},*/
	ComponentDidMount(){
	    const { drizzle } = this.props;
	    const contract = drizzle.contracts.Mining;

	}

	render() {
		return(
		<div id='predictionInput'>
		<h2>Make Prediction</h2>
		<label>Date</label>
		<input type='datetime-local' name='date' value={this.state.date} onChange={e =>this.handleChange(e)}></input>
		<br/>
		<label>Predicted Difficulty</label>
		<input type='number' name= 'difficulty' value={this.state.difficulty} onChange={e =>this.handleChange(e)}></input>
		<br/>
		<label>Above</label>
		<input type='radio' value='Above' name='predictionAbove' onChange={e =>this.handleChange(e)}></input>
		<br/>
		<label>Below</label>
		<input type='radio' valule='Below' name='predictionAbove' onChange={e =>this.handleChange(e)}></input>
		<br/>
		<label>Wei</label>
		<input type='number' name='ether' value={this.state.predictionEther} onChange={e =>this.handleChange(e)}></input>
		<button onClick={this.handleSubmit}>Submit Prediction</button>
		</div>)
	}
}
export default SetPrediction;