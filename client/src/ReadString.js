import React from "react";

class ReadString extends React.Component {
  state = { dataKey: null };

  componentWillMount() {
    const { drizzle }  = this.props;
    const contract = drizzle.contracts.MyStringStore;
    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["myString"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    const { MyStringStore } = this.props.drizzleState.contracts;
 
    // using the saved `dataKey`, get the variable we're interested in
    //console.log(this.props);

    const myString = MyStringStore.myString[this.state.dataKey];

    // if it exists, then we display its value
    return <p>My stored string: {myString && myString.value}</p>;
  }
}

export default ReadString;
