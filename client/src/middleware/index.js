import { generateStore, EventActions } from 'drizzle'
import drizzleOptions from '../drizzleOptions'
import { generateContractsInitialState } from 'drizzle'
import reducer from '../reducer'
import Mining from '../contracts/Mining.json'
import { Drizzle } from 'drizzle'


const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    const contract = action.name
    const contractEvent = action.event.event
    const message = action.event.returnValues._message
    const display = `${contract}(${contractEvent}): ${message}`
    console.log(display);
  }
  return next(action)
}

const options = {
  contracts: [
    Mining
  ]
}

const drizzle = new Drizzle(options)


const appMiddlewares = [ contractEventNotifier ]
const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
}

const store = generateStore({
  reducer,
  initialState,
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false
})

var state = drizzle.store.getState()

// If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
if (state.drizzleStatus.initialized) {
  let x = 0
}
export default store
