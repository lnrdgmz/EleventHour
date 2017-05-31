// Import React Dependencies
import React, { Component } from 'react';

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
