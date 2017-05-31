// Import React and Redux Dependencies
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
// Import Local Dependencies
import reducers from './reducers/rootReducer.js';
import Routes from './routes/Routes';
import { fetchEvents, selectEvent } from './actions/eventActions.js';

// Create the Store
export const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    reduxLogger));

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app'),
);

store.dispatch(fetchEvents())