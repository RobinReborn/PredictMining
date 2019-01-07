import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ReadDifficulty from "./ReadDifficulty";

import { Drizzle, generateStore } from "drizzle";
import Mining from "./contracts/Mining.json";
import MyStringStore from "./contracts/MyStringStore.json";

// let drizzle know what contracts we want
const options = { contracts: [MyStringStore,Mining] };

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);


ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));
serviceWorker.unregister();

