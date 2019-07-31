import React, { Component } from 'react'
import { AccountData, ContractData } from 'drizzle-react-components'
import ContractForm from "./ContractForm"
import PropTypes from 'prop-types'

class Home extends Component {
  constructor(props, context) {
  super(props)
  this.contracts = context.drizzle.contracts
  this.dataKey = this.contracts.Mining.methods.predictionArrayLength.cacheCall();
  //this.arrayDataKey = this.contracts.Mining.methods.predictionArray.cacheCall(0);
  this.show = this.show.bind(this);
  this.checkPositions = this.checkPositions.bind(this)
  this.state = {predictionShow: [], maxBelow: 0, minAbove : 0};

}

checkPositions(array) {
  console.log(array)
  for (let i = 0; i < array.length; i++){
    if (array[i].value[2] > this.state.maxBelow && array[i].value[3]===false){
      this.setState({maxBelow: array[i].value[2]})
    }
    else if (array[i].value[2]< this.state.minAbove && array[i].value[3]===true){
      this.setState({minAbove: array[i].value[2]})
    }
  }
}
  

show = (index) =>  {
  let showValue = this.state.predictionShow
  showValue[index] = showValue[index] == 'block' ? 'none' : 'block' 
  this.setState({predictionShow: showValue})
}

  render() {
    let predictionArray = [];
    let arrayVals = []
    if (!(this.props.Mining.predictionArray) || !this || !(this.props.Mining.predictionArrayLength[this.dataKey])) {
      predictionArray.push('<p>Loading... </p>')
    }
    else {
      for (let i = 0; i < this.props.Mining.predictionArrayLength[this.dataKey].value; i++) {
        predictionArray.push(<div><div onClick={() => this.show(i)} style={{"display": this.state.predictionShow[i]}} >
          <ContractData contract='Mining' method='predictionArray' methodArgs={[i]}/>
          </div>
          <button onClick={() => this.show(i)} style={{"display": this.state.predictionShow[i] === 'none' ? 'block' : 'none' }}>Show</button>
          </div>);
      

      }
      for (let i in this.props.Mining.predictionArray ){
        arrayVals.push(this.props.Mining.predictionArray[i])
      }
      this.checkPositions(arrayVals)    
    }
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex={0} units="ether" precision={3} />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Difficulty</h2>
            <p>This shows current mining difficulty</p>
            <ContractData contract="Mining" method="difficulty"/>
            <p>this is current prediction array length</p>
            <ContractData contract="Mining" method="predictionArrayLength"/>
            <div id='predictionHolder'>{predictionArray}</div>
            <ContractForm contract="Mining" method="setPrediction" valueLabel="valueLabel"/>

            <br/><br/>
            <ContractData contract="Mining" method="predictionsAtTime" methodArgs={[1355270400]} />
            <ContractForm contract="Mining" method="evaluatePredictions" sendArgs={['gas':10000000000]}/>
            <div>{this.state.maxBelow}</div>
            <div>{this.state.minAbove}</div>
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
