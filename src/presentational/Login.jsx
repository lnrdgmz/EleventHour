// Import React Dependencies
// Import React Dependencies
import React from 'react';

// Import Semantic-UI Components
import { Grid, Container, Header, Reveal, Image, Divider } from 'semantic-ui-react';

// Import Local Dependencies
import '../../public/Styles/Login.scss';

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
      video.style.width = newWidth + 'px';
      video.style.height = newHeight + 'px';
    };

    video.addEventListener('loadedmetadata', setVideoDimensions, false);
    window.addEventListener('resize', setVideoDimensions, false);
  }
  render() {
    return (
      <div className="page-container">
        <Grid width={16} stretched>
          <video loop muted autoPlay className="fullscreen-video">
            <source src="https://i.imgur.com/ee9tRfR.mp4" type="video/mp4" />
          </video>
        </Grid>
        <Grid width={16} stretched>
          {/* This Cinemagraph was submitted to reddit.com/r/cinemagraphs by user, rbojunglist */}
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
        </Grid>
      </div>
    );
  }
}

export default Login;
