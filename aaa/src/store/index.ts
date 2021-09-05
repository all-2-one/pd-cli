import {
  createStore, compose, applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
// @ts-ignore
import win from 'global/window';
import rootSaga from './rootSaga';
import rootReducers from './rootReducers';

const composeEnhancers = process.env.NODE_ENV !== 'production' && win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, maxAge: 30 })
  : compose;
const sagaMiddleware = createSagaMiddleware();

const enhancers = [applyMiddleware(sagaMiddleware)];
const store = createStore(rootReducers, composeEnhancers(...enhancers));

sagaMiddleware.run(rootSaga);

export default store;
