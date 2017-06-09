// Import React Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router';
// Import Semantic-UI Components
import { Container, Grid, Header, Button, Form } from 'semantic-ui-react';

// Import Local Dependencies
import LoginModal from './LoginModal.jsx';
import About from './About';
import '../../public/styles/login.scss';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: false,
      zipCode: undefined,
    };
    this.showEvents = this.showEvents.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value.split('').filter(char => !isNaN(parseInt(char, 10))).slice(0, 5).join('');
    this.setState({
      zipCode: value,
    });
  }

  showEvents(event) {
    event.preventDefault();
    window.location = `/#/events/${this.state.zipCode}`;
  }

  render() {
    return (
      <div>
        <div className="login-container">
          <div className="topHalf">
          <Grid width={16} stretched className="login-background-grid">
            <video loop muted autoPlay className="login-video" width="300" height="200" >
              <source src="https://i.imgur.com/ee9tRfR.mp4" type="video/mp4" />
            </video>
          </Grid>
          <Grid width={16} stretched className="login-foreground-grid">
            {/* This Cinemagraph was submitted to reddit.com/r/cinemagraphs by user, rbojunglist */}
            <Grid columns={1} centered verticalAlign="middle">
              <Grid.Column width={16}>
                <Header size="huge" textAlign="center" className="login-header">
                  <Header.Content className="login-header">
                    Eleventh 
                  </Header.Content>
                  <Header.Content className="login-front">
                    Hour
                  </Header.Content>
                  <Header.Subheader className="subHeader" className="login-subHeader">
                    Find people. Fill your group. Do the things you love.
                  </Header.Subheader>
                </Header>
                <Grid.Row>
                  <Form>
                    <Form.Field>
                      <input
                        value={this.state.zipCode}
                        placeholder="Enter a zip code to get started"
                        onChange={this.handleInputChange}
                      />
                    </Form.Field>
                    <Button
                      disabled={this.state.zipCode ? this.state.zipCode.length < 5 : true}
                      onClick={this.showEvents}
                      className="splash-button"
                    >
                      Let's Go!
                    </Button>
                  </Form>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Grid>
          </div>
        </div>
        <About />
      </div>
    );
  }
}

export default Login;
