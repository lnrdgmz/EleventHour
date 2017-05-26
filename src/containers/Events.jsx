// Import React and Redux Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      visibleEvents: [],
      user: {
        userId: 42691,
        username: 'Guest',
        age: 18,
        email: 'guest@lfm.io',
        bio: "You're our guest! Make yourself at home!",
        cell: '555-555-5555',
        created_at: '2017-05-22',
        authenticated: false,
      },
      loadingAnimation: false,
    };
  }

  componentWillMount() {
    // Check if the User is Logged In
    fetch('/auth/loggedIn', { credentials: 'include' })
      // If so, Update the State with the User's Information
      .then((res) => {
        console.log('hey');
        return res.json();
      })
      .then((data) => {
        console.log('hi');
        if (data !== false) {
          this.setState({
            ...this.state,
            user: {
              userId: res.id,
              username: res.display_name,
              age: res.age,
              email: res.email,
              bio: res.bio,
              cell: res.contact_number,
              created_at: res.created_at,
              authenticated: true,
            },
          });
        } else {
          // If not, Redirect the User to the Splash Page
          window.location = '/#/home';
        }
      })
      .catch((err) => {
        console.error('Authentication Error:', err);
      });
  }
  // To-Do:
    // Render a Default Events List
    // Render a User-Tailored Events List
    //

  render() {
    return (
      <div>
        <h1> Events go Hurr </h1>
      </div>
    );
  }
}

const mapStatetoProps = ({ events }) => ({
  events: events.eventsList,
  visibleEvents: events.visibleEvents,
});


export default connect(mapStatetoProps, {})(Events);
