// Import React and Redux Dependencies
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Import Local Dependencies
import reducers from './reducers/rootReducer.js';
import Routes from './routes/Routes';

// Create the Store
const store = createStore(
  reducers,
  applyMiddleware(thunk),
);
console.log(store.getState())
render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app'),
);
