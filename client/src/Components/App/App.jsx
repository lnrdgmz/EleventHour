// Import React Components
import React, { Component } from 'react';
import { Route } from 'react-router';
// Import Local Components and CSS
import Events from '../Events/Events.jsx';
import UserProfile from '../UserProfile/UserProfile.jsx';
import MenuBar from '../MenuBar/MenuBar.jsx';
import css from './app.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div>
          <MenuBar />
          <h1>+One</h1>
        </div>
        <Route path="#/events" component={Events} />
        <Route path="#/users" component={UserProfile} />
      </div>
    );
  }
}

export default App;
