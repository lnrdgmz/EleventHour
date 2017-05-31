import React from 'react';
import {connect} from 'react-redux';


class Events extends React.Component {
  constructor(props) {
    this.state = {
      events: [],
      filterByTitle: "",
      user: {
        userId: 42691,
        username: 'Guest',
        age: 18,
        email: 'guest@lfm.io',
        bio: "You're our guest! Make yourself at home!",
        cell: '555-555-5555',
        created_at: '2017-05-22',
        authenticated: false
      },
      loadingAnimation: false,
     
    }
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
              userId: data.id,
              username: data.display_name,
              age: data.age,
              email: data.email,
              bio: data.bio,
              cell: data.contact_number,
              created_at: data.created_at,
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

  componentDidMount() {
     fetch('/events?page=5').then((response) => {
       return response.json()
     }).then((parsedData) => this.setState({events : parsedData})};

  onFilterEvents(event){this.setState({filterByTitle : event.target.value})}

  export default connect(mapStatetoProps,{
    
  })(Events);