import React from 'react';
import { render } from 'react-dom';
import UserProfile from './UserProfile.jsx';
import MenuBar from './MenuBar.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <div id="menuBar">
          <MenuBar />
        </div>
        <div id="profile">
          <UserProfile />
        </div>
      </div>
    );
  }
}

export default App;