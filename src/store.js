import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import reducers from './reducers/index.js';

const appReducers = combineReducers({
  reducers,
  routing: routerReducer,
});

const middlewares = applyMiddleware(
  thunkMiddleware,
  createLogger()
);

const store = createStore(
  appReducers,
  middlewares
)

export default store;