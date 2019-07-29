import React, { Component } from 'react'
import { AccountData, ContractData } from 'drizzle-react-components'
import SetPrediction from "./SetPrediction";
import ContractForm from "./ContractForm"
import PropTypes from 'prop-types'

class Home extends Component {
  constructor(props, context) {
  super(props)

  this.contracts = context.drizzle.contracts
  this.dataKey= this.contracts.Mining.methods.predictionArrayLength.cacheCall();
}


  render() {
    var predictionArray = [];
    if (!(this.dataKey in this.props.Mining.predictionArrayLength)) {
      predictionArray.push('<p>Loading... </p>')
    }
    else {
    for (var i = 0; i < this.props.Mining.predictionArrayLength[this.dataKey].value; i++){
      predictionArray.push(<ContractData contract ='Mining' method='predictionArray' methodArgs={[i]}/>);
    }
  }
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Difficulty</h2>
            <p>This shows current mining difficulty</p>
            <ContractData contract="Mining" method="difficulty"/>
            <p>this is current prediction array length</p>
            <ContractData contract="Mining" method="predictionArrayLength"/>
            <p>{predictionArray}</p>
            <ContractData contract="Mining" method="predictionArray" methodArgs={[0]}/>
            <ContractForm contract="Mining" method="setPrediction" valueLabel="valueLabel"/>

            <br/><br/>
            <ContractData contract="Mining" method="predictionsAtTime" methodArgs={[1355270400]} />
            <ContractForm contract="Mining" method="evaluatePredictions" sendArgs={['gas':10000000000]}/>
          </div>

         
        </div>
      </main>
    )
  }
}
Home.contextTypes = {
  drizzle: PropTypes.object
}

export default Home
