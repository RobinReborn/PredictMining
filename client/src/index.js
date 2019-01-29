import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import drizzleOptions from './drizzleOptions'
import { Router, Route } from 'react-router'
import { history, store } from './store'
import { LoadingContainer } from 'drizzle-react-components'


import { Drizzle, generateStore } from "drizzle";
import Mining from "./contracts/Mining.json";
import { DrizzleProvider } from 'drizzle-react'

// let drizzle know what contracts we want
const options = { contracts: [Mining] };
const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    Mining
  ],
  events: {
    Mining: ['Refund']
  },
  polls: {
    accounts: 1500
  },
  syncAlways: true
}
// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);


//ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));*/}

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
    <LoadingContainer>
    <Router history={history} store={store}>
              <Route exact path="/" component={App} />
              </Router>
              </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
serviceWorker.unregister();

