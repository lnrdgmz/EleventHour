// Import React Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Semantic-UI and CSS Components
import { Grid, Image, Header, Segment, Container } from 'semantic-ui-react';
import css from './profile.css';

// Import Local Components
import MenuTabs from '../MenuTabs/MenuTabs.jsx';
import MenuBar from '../MenuBar/MenuBar.jsx';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: [],
    };
  }
  componentDidMount() {
    fetch('/auth/loggedIn', { credentials: 'include' })
        .then((res) => {
          res.json()
            .then((data) => {
              this.setState({
                currentUser: data,
              });
            });
        });
  }
  render() {
      return (
        <div>
          <MenuBar />
          <Container width={16}>
            <Grid stackable>
              <Grid.Column width={4}>
                <Image shape="rounded" src={this.state.currentUser.img_url} />
              </Grid.Column>
              <Grid.Column width={12} className="userInfo" verticalAlign="middle" textAlign="center">
                <Segment vertical>
                  <Header as="h1" color="teal">
                    {this.state.currentUser.display_name}
                  </Header>
                </Segment>
                <Segment vertical>
                  <Header as="h2" color="teal">
                    {this.state.currentUser.age}
                  </Header>
                </Segment>
                <Segment vertical>
                  <Header as="h3" color="teal">
                    New York, NY
                  </Header>
                </Segment>
              </Grid.Column>
            </Grid>
            <MenuTabs />
          </Container>
        </div>
      );
  }
}

export default UserProfile;
