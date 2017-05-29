// Import React Dependencies
// Import React Dependencies
import React from 'react';

// Import Semantic-UI Components
import { Grid, Container, Header, Reveal, Image, Popup, Button } from 'semantic-ui-react';
import LoginModal from './LoginModal.jsx';

// Import Local Dependencies
import '../../public/styles/login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: false,
    };
  }
  componentDidMount() {
    const video = document.querySelector('.fullscreen-video');
    const container = document.querySelector('.video-container');
    let newWidth;
    let newHeight;
    const setVideoDimensions = () => {
      const w = video.videoWidth;
      const h = video.videoHeight;
      const videoRatio = (w / h).toFixed(2);
      const containerStyles = window.getComputedStyle(container);
      const minW = parseInt(containerStyles.getPropertyValue('width'));
      const minH = parseInt(containerStyles.getPropertyValue('height'));
      const widthRatio = minW / w;
      const heightRatio = minH / h;
      
      if (widthRatio > heightRatio) {
        newWidth = minW;
        newHeight = Math.ceil(newWidth / videoRatio);
      } else {
        newHeight = minH;
        newWidth = Math.ceil(newHeight * videoRatio);
      }
      video.style.width = newWidth.concat('px');
      video.style.height = newHeight.concat('px');
    };

    video.addEventListener('loadedmetadata', setVideoDimensions, false);
    window.addEventListener('resize', setVideoDimensions, false);
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
                <Popup wide trigger={<LoginModal />} on='click'>
                  <Grid divided columns='equal'>
                    <Grid.Column className="centeredButtons">
                      <Popup
                        trigger={<a href="/auth/facebook" className="facebook-login-button" />}
                        content='The story ends. You wake up in your bed and believe whatever you want to believe.'
                        position='bottom center'
                        size='small'
                        inverted
                      />
                    </Grid.Column>
                    <Grid.Column className="centeredButtons">
                      <Popup
                        trigger={<a href="/auth/google" className="google-login-button" />}
                        content='Stay in Wonderland, and I show you how deep the rabbit hole goes.'
                        position='bottom center'
                        size='small'
                        inverted
                      />
                    </Grid.Column>
                  </Grid>
                </Popup>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
