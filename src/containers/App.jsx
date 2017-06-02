// Import React Dependencies
import React, { Component } from 'react';
// import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';


// Import Local Dependencies
import MenuBar from '../presentational/MenuBar';
import Login from '../presentational/Login';
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

const mapStateToProps = (ownProps) => {
  const user = ownProps.user;
  return {
    user,
  };
};

export default connect(mapStateToProps)(App);
