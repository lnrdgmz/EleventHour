// Import React Dependencies
import React, { Component } from 'react';

// Import Local Dependencies
import MenuBar from '../components/MenuBar';
import Login from '../components/Login';

class App extends Component {
  render() {
    return (
      <div>
        <MenuBar />
        <Login />
      </div>
    );
  }
}

export default App;
