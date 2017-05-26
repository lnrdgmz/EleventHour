// Import React Dependencies
// Import React Dependencies
import React from 'react';

// Import Semantic-UI Components
import { Grid, Container, Header, Reveal, Image, Divider } from 'semantic-ui-react';

// Import Local Dependencies
import '../../public/Styles/login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: false,
    };
  }

  facebookLogion() {
    window.location = '/auth/facebook';
  }

  googleLogin() {
    window.location = '/auth/google';
  }
  
  render() {
    return (
      <Container fluid className="page-container">
        {/* This Cinemagraph was submitted to reddit.com/r/cinemagraphs by user, rbojunglist */}
        <video loop muted autoPlay className="background">
          <source src="https://i.imgur.com/ee9tRfR.mp4" type="video/mp4" />
        </video>
        <Grid container columns={1} centered>
          <Grid.Column width={16} verticalAlign="middle">
            <Header size="huge" textAlign="center">
              <Header.Content className="header">
                LFM
              </Header.Content>
              <Header.Subheader className="subHeader">
                Find people. Fill your group. Do the things you love.
              </Header.Subheader>
            </Header>
            <Grid.Row>
              <a href="/auth/facebook" className="facebook-login-button">
                <Image verticalAlign="middle" shape="rounded" src="https://www.transparenttextures.com/patterns/asfalt-light.png" centered size="small" className="facebook-login-button" />
              </a>
              <Divider vertical>Or</Divider>
              <a href="/auth/google" className="google-login-button">
                <Image verticalAlign="middle" src="https://www.transparenttextures.com/patterns/asfalt-light.png" shape="rounded" centered size="small" className="google-login-button" />
              </a>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Login;
