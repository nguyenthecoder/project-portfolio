import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './reducers/authReducers'
import profileReducer from './reducers/profileReducer'

// const initState = 0;

const rootReducer = combineReducers({
  authReducer,
  profileReducer
})

const composeEnhancer = composeWithDevTools({
  name: 'NewsApp'
})

const enhancers = composeEnhancer(applyMiddleware(thunk))

const store = createStore(rootReducer, enhancers)

export default store
