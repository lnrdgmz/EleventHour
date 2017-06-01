// Import React Dependencies
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';


// Import Local Dependencies
import MenuBar from '../presentational/MenuBar';
import Login from '../presentational/Login';
import { loginUser } from '../actions/actions.js';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.loginUser();
  }
  render() {
    const cookies = new Cookies();
    const redirectUrl = cookies.get('redirectTo', { path: '/' });

    if (redirectUrl) {
      cookies.remove('redirectTo', { path: '/' });
      return (
        <Redirect push to={redirectUrl.split('#')[1]} />
      );
    }
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

export default connect(mapStateToProps, {
  loginUser,
})(App);
