import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import App from '.././containers/App';
// import Splash from '.././components/Splash';
import Profile from '.././containers/Profile';
import Events from '../containers/Events';
import Survey from '../containers/Survey';
import UserEvents from '../containers/UserEvents';
import EventForm from '../components/EventForm';

const Routes = () => (
  <HashRouter basename="/" component={App}>
    <Switch>
      <Route path="/eventForm" component={EventForm} />
      <Route path="/users" component={Profile} />
      <Route path="/events" component={Events} />
      <Route path="/survey" component={Survey} />
      <Route path="/userEvents" component={UserEvents} />
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>
);

export default Routes;
