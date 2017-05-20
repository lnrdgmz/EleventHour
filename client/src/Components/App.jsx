import React from 'react';
import { render } from 'react-dom';
import styles from '.././app.css'

class App extends React.Component {
  render() {
    return (
      <h1 id="spash">+One</h1>
    );
  }
}
render(<App />, document.getElementById('app'));
