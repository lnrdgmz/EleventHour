import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import App from '.././containers/App';
// import Splash from '.././components/Splash';
import Profile from '.././containers/Profile';
import Main from '.././containers/Main';

const Routes = () => (
  <HashRouter basename="/" component={Main}>
    <Switch>
      <Route path="/users" component={Profile} />
      <Route path="/home" component={App} />
      <Route path="/" component={Main} />
    </Switch>
  </HashRouter>
);

export default Routes;
