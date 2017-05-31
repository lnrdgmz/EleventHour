//external dependencies
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
//local dependencies
import App from '.././containers/App';
import Profile from '.././containers/Profile';
import Events from '.././containers/Events.jsx';

const Routes = () => (
  <HashRouter basename="/" component={App}>
    <Switch>
      <Route path="/users" component={Profile} />
      <Route path="/home" component={Events} />
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>
);

export default Routes;
