// Import React Components
import React from 'react';
import { Provider } from 'react-redux';
// import logger from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { hashHistory, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
// import { routerReducer, routerMiddleware } from 'react-router-redux';


// Import Local Components
import App from './Components/App/App.jsx';
import Events from './Components/Events/Events.jsx';
import CreateEvent from './Components/CreateEvents/createEvent.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';
import rootReducer from './Reducers/rootReducer.js';
import createHistory from 'history/createBrowserHistory';
import Details from './Components/Details/Details.jsx';

const history = createHistory();
const reducers = combineReducers({
  rootReducer,
  //logger,
  history,
});
// Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history, logger, thunkMiddleware);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  // combineReducers({
  //   ...rootReducer,
  //   router: routerReducer
  // }),
  reducers,
  applyMiddleware(
    // history,
    // logger,
    thunkMiddleware
  ),
);

render(
  <Provider store={store}>
    <HashRouter basename="/" component={App}>
      <Switch>
        <Route path="/users" component={UserProfile} />
        <Route path="/events" component={Events} />
        <Route path="/createEvent" component={CreateEvent} />
        <Route path={HashRouter.basename} component={App} />
      </Switch>
    </HashRouter>
  </Provider>, document.getElementById('app')
);
