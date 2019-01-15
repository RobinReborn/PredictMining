import React from "react";
class GetPrediction extends React.Component {
	  constructor(props) {
	    super(props);

	this.state = { date:'', difficulty:0, above:false, ether:0 };
	}
  componentWillMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Mining;
    const dataKey = contract.methods["getDifficulty"].cacheSend();
	}