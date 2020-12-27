import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import reducers from './reducers';

// const NodeMediaServer = require('node-media-server');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
ReactDOM.render(
  <Provider
    store={createStore(reducers, composeEnhancers(applyMiddleware(thunk)))}
  >
    <App />
  </Provider>,
  document.querySelector('#root')
);
