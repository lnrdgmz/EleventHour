// Import React Components
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// Import CSS
import 'semantic-ui-react';
import './styles/style.css';

// Import Local Components
import App from './Components/App.jsx';
import reducer from './Reducers';

// Create the Store
const store = createStore(reducer);

// Render our App
render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
);
