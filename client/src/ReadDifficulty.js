import React from "react";

class ReadDifficulty extends React.Component {
	state = { dataKey: null };

  componentWillMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Mining;
    const dataKey = contract.methods["getDifficult"].cacheSend();
    this.setState({dataKey});

    // subscribe to changes in the store
  }


  render() {
    // get the contract state from drizzleState
    //const { Mining } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in

    //const myString = Mining.methods[this.state.dataKey];

    // if it exists, then we display its value
    return <p>My stored string: {this.state.dataKey}</p>;
  }


}

export default ReadDifficulty;
