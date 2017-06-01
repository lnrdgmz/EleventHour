//external dependencies
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
//local dependencies
import App from '.././containers/App';
import Profile from '.././containers/Profile';

import Events from '../containers/Events';
import Survey from '../containers/Survey';
import UserEvents from '../containers/UserEvents';
import EventForm from '../components/EventForm';
import EditProfile from '../containers/EditProfile';
const Routes = () => (
  <HashRouter basename="/" component={App}>
    <Switch>
      <Route path="/eventForm" component={EventForm} />
      <Route path="/users" component={Profile} />
      <Route path="/edit" component={EditProfile} />>
      <Route path="/events" component={Events} />
      <Route path="/survey" component={Survey} />
      <Route path="/userEvents" component={UserEvents} />
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>
);

export default Routes;
