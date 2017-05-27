// Import React Dependencies
import React, { Component } from 'react';

// Import Local Dependencies
import MenuBar from '../components/MenuBar';
import Login from '../components/Login';
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
