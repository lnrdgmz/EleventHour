// Import React Components
import React, { Component } from 'react';

// Import Semantic-UI and CSS Components
import { Grid, Image, Header, Segment, Container } from 'semantic-ui-react';

// Import Local Components
import MenuBar from '../components/MenuBar.jsx';
import '../../public/styles/profile.scss';
import fetch from 'isomorphic-fetch';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: [],
    };
  }
  componentDidMount() {
    fetch('auth/loggedIn', { credentials: 'include' })
      .then((res) => {
        console.log()
        return res.json();
      })
      .then((data) => {
        if(data === false) {
          window.location = '/';
        }
        this.setState({
          currentUser: data,
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
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Profile;
