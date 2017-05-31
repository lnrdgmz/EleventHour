// Import React Dependencies
// Import React Dependencies
import React from 'react';

// Import Semantic-UI Components
import { Grid, Header, Popup } from 'semantic-ui-react';
import LoginModal from './LoginModal.jsx';

// Import Local Dependencies
import '../../public/Styles/Login.scss';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: false,
    };
  }

  render() {
    return (
      <div className="page-container">
        <Grid width={16} stretched>
          <video loop muted autoPlay className="fullscreen-video" width="300" height="200" >
            <source src="https://i.imgur.com/ee9tRfR.mp4" type="video/mp4" />
          </video>
        </Grid>
        <Grid width={16} stretched>
          {/* This Cinemagraph was submitted to reddit.com/r/cinemagraphs by user, rbojunglist */}
          <Grid columns={1} centered verticalAlign="middle">
            <Grid.Column width={16}>
              <Header size="huge" textAlign="center">
                <Header.Content className="login-header">
                  LFM
                </Header.Content>
                <Header.Subheader className="subHeader">
                  Find people. Fill your group. Do the things you love.
                </Header.Subheader>
              </Header>
              <Grid.Row>
                <Popup trigger={<LoginModal />} />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
