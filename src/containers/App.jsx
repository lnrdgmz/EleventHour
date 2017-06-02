// Import React Dependencies
import React, { Component } from 'react';
// import Cookies from 'universal-cookie';


// Import Local Dependencies
import MenuBar from '../components/MenuBar';
import Login from '../components/Login';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = ownProps.user;
  return {
    user,
  };
};

export default connect(mapStateToProps)(App);
