import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import App from '.././containers/App';
// import Splash from '.././components/Splash';
import Profile from '.././containers/Profile';
import Events from '../containers/Events';
import EventCreator from '../containers/EventCreator';
import Survey from '../containers/Survey';
import Modal from '../components/Modal';

const Routes = () => (
  <HashRouter basename="/" component={App}>
    <Switch>
      <Route path="/modal" component={Modal} />
      <Route path="/users" component={Profile} />
      <Route path="/events" component={Events} />
      <Route path="/survey" component={Survey} />
      <Route path="/eventCreator" component={EventCreator} />
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>
);

export default Routes;
