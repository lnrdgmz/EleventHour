import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import App from '.././containers/App';
// import Splash from '.././components/Splash';
import Profile from '.././containers/Profile';
import Events from '../containers/Events';
import Survey from '../containers/Survey';

const Routes = () => (
  <HashRouter basename="/" component={App}>
    <Switch>
      <Route path="/users" component={Profile} />
      <Route path="/home" component={Events} />
      <Route path="/survey" component={Survey} />
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>
);

export default Routes;
