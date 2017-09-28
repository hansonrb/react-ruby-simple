/* eslint-disable no-undef */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import './index.css';

import rootReducer from './reducers';
import routes from './routes';
import sagas from './sagas';

import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();

// applies thunk and custom middleware to store
const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(
      sagaMiddleware,
      thunkMiddleware,
      routerMiddleware(browserHistory),
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

sagaMiddleware.run(sagas);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
    />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
