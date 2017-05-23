import React from 'react';
import { render } from 'react-dom';
import UserProfile from '../UserComponent/UserProfile.jsx';
import MenuBar from '../MenuComponent/MenuBar.jsx';
import css from './app.css';


class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <div>
          <MenuBar />
          <h1>+One</h1>
        </div>
      </div>
    );
  }
}

export default App;
