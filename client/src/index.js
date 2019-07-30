import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import drizzleOptions from './drizzleOptions'
import { Router, Route } from 'react-router'
import { LoadingContainer } from 'drizzle-react-components'
import store from './middleware'
import drizzleOptions, {options} from './drizzleOptions';

import { Drizzle, generateStore } from "drizzle";
import { DrizzleProvider } from 'drizzle-react'

// let drizzle know what contracts we want

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);



ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
    <LoadingContainer>
      <App />       
    </LoadingContainer> 
    </DrizzleProvider>
  ),
  document.getElementById('root')
);

