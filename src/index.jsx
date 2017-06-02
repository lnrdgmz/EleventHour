// Import React and Redux Dependencies
import React from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
// Import Local Dependencies
import reducers from './reducers/rootReducer.js';
import Routes from './routes/Routes';
import { fetchEvents, selectEvent } from './actions/eventActions.js';

// Create the Store

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk),
  autoRehydrate(),
));

persistStore(store, {
  blacklist: ['user'],
});

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app'),
);

store.dispatch(fetchEvents());
