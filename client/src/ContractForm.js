import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class ContractForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
        if (abi[i].name === this.props.method) {
            this.inputs = abi[i].inputs;

            for (var j = 0; j < this.inputs.length; j++) {
                initialState[this.inputs[j].name] = '';
            }

            break;
        }
    }

    this.state = initialState;
  }

  handleSubmit() {
    let args = 0;
    var date = this.state.date;
    if (this.state.valueLabel) {
      args = this.state.valueLabel;
      delete this.state.valueLabel;
    }
    if (this.state.date) {  
      this.stateState({date : new Date(date).getTime()/1000});
    }
    if (this.props.sendArgs) {
      return this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values(this.state), 
        {value: args,gas:100000});

    }
    this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values(this.state), {value: args});
     const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:3001';
    Http.open("POST", url,true);
    Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //Http.send("date="+this.state.date);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  translateType(type,name) {
    switch(true) {
        case name == 'date':
            return 'date'
        case /^uint/.test(type):
            return 'number'
        case /^string/.test(type) || /^bytes/.test(type):
            return 'text'
        case /^bool/.test(type):
            return 'checkbox'
        default:
            return 'text'
    }
  }

  render() {
    const valueLabel = this.props.valueLabel;
    return (
      <form className="pure-form pure-form-stacked">
        {this.inputs.map((input, index) => {            
            var inputType = this.translateType(input.type,input.name)
            var inputLabel = this.props.labels ? this.props.labels[index] : input.name
            // check if input type is struct and if so loop out struct fields as well
            return (<input key={input.name} type={inputType} name={input.name} value={this.state[input.name]} placeholder={inputLabel} onChange={this.handleInputChange} />)
        })}
        {valueLabel &&
          <input key={valueLabel} type='number' name={valueLabel} value={this.state[valueLabel]} placeholder={valueLabel} onChange={this.handleInputChange} />
        }
        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

ContractForm.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(ContractForm, mapStateToProps)