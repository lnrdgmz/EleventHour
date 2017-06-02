//external dependencies
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';

//local dependencies
import App from '.././containers/App';
import Profile from '.././containers/Profile';

import Events from '../containers/Events';
import EventCreator from '../containers/EventCreator';
import Survey from '../containers/Survey';
import UserEvents from '../containers/UserEvents';
import Modal from '../components/Modal';
import { loginUser } from '../actions/actions.js';

class Routes extends React.Component {
  componentDidMount() {
    this.props.loginUser();
  }

  render() {
    return (
      <HashRouter basename="/" component={App}>
        <Switch>
          <Route path="/modal" component={Modal} />
          <Route path="/users" component={Profile} />
          <Route path="/events" component={Events} />
          <Route path="/survey" component={Survey} />
          <Route path="/userEvents" component={UserEvents} />
          <Route path="/eventCreator" component={EventCreator} />
          <Route path="/" component={App} />
        </Switch>
      </HashRouter>
    );
  }
}

export default connect(null, { loginUser })(Routes);
