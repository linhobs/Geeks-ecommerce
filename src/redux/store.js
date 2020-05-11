import { createStore, applyMiddleware } from 'redux'
//add middleware (using redux-logger)
import logger from 'redux-logger'
//bring in root reducer
import rootReducer from './root-reducer'
//set up middleware
const middlewares = [logger]

//create store from rootreducer
const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store;
