import { generateStore, EventActions } from 'drizzle'
import drizzleOptions from '../drizzleOptions'
import { generateContractsInitialState } from 'drizzle'
import reducer from '../reducer'

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

export default store
