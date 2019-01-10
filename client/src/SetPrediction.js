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

	handleSubmit(e) {
		const formData = {};
		e.preventDefault();
		    for (const field in this.refs) {
		    	if ((typeof field) == Date){
		    		formData[field] = this.refs[field].value.getTime() / 1000;
		    	}
		    	else{
      				formData[field] = this.refs[field].value;
				}
			}
    console.log('-->', formData);

	}
	/*handlepredictionDateChange: function(e) {
		this.setState({date: e.target.value});
	},
	handlepredictionDifficulty: function(e) {
		this.setState({difficulty: e.target.value});
	},*/
	ComponentWillMount(){
	    const { drizzle } = this.props;
	    const contract = drizzle.contracts.Mining;

	}

	render() {
		return(
		<div id='predictionInput'>
		<h2>Make Prediction</h2>
		<form onSubmit={this.handleSubmit}>
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
		<label>Ether</label>
		<input type='number' value={this.state.predictionEther} onChange={e =>this.handleChange(e)}></input>
		<input type='submit'></input>
		</form>
		</div>)
	}
}
export default SetPrediction;