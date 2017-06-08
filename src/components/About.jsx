import React, { Component } from 'react';
import { Container, Grid, Header, Image, Icon } from 'semantic-ui-react';
import '../../public/styles/login.scss';

class About extends Component {
  render() {
    return (
      <Container fluid className="about-us">
        <Grid className="about" columns={4}>
          <Grid.Row centered>
            <Header as="h1" color="blue" className="eleventhour">About El<span className="event-text-title">event</span>Hour</Header>
          </Grid.Row>
          <Grid.Row centered>
            <Container className="description">
              Have you ever had to cancel plans because one person canceled at the last-minute? <br />
              With EleventHour, you can fill that final spot, and will no-longer need to cancel group events! <br />
              Just post your event, fill in the details, and before you know it, you will have a line of people asking to fill that last spot.
            </Container>
          </Grid.Row>
          <Grid.Row centered>
            <Header as="h1" color="blue" className="eleventhour">The EleventHour Team</Header>
          </Grid.Row>
          <Grid.Row className="team" centered textAlign="center">
            <Grid.Row centered textAlign="center" className="team">
              <Grid.Column textAlign="center">
                  <a href="https://github.com/biczak" className="team-member">
                    <Image className="team-photo" src="https://avatars0.githubusercontent.com/u/25611530?v=3&s=460" />
                  </a>
                  <Header color="blue" as="h3">Alex Biczak</Header>
                  <Header.Subheader>
                    <a href="https://github.com/biczak">
                      <Icon size="big" name="github alternate" />
                    </a>
                  </Header.Subheader>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <a href="https://github.com/lnrdgmz" className="team-member">
                  <Image className="team-photo" src="http://i.imgur.com/Ke6KIM2.jpg" />
                </a>
                <Header color="blue" as="h3">Leo Gomez</Header>
                <Header.Subheader>
                  <a href="https://github.com/lnrdgmz">
                    <Icon size="big" name="github alternate" />
                  </a>
                </Header.Subheader>
              </Grid.Column> 
              <Grid.Column textAlign="center">
                <a href="https://github.com/KESchuettler" className="team-member">
                  <Image className="team-photo" src="https://avatars1.githubusercontent.com/u/8907103?v=3&s=460" />
                </a>
                <Header color="blue" as="h3">Kendrick Schuettler</Header>
                <Header.Subheader>
                  <a href="https://github.com/KESchuettler">
                    <Icon size="big" name="github alternate" />
                  </a>
                </Header.Subheader>
              </Grid.Column> 
              <Grid.Column textAlign="center">
                <a href="https://github.com/Eric-Zayas" className="team-member">
                  <Image className="team-photo" src="https://avatars3.githubusercontent.com/u/17184871?v=3&s=460" />
                </a>
                <Header color="blue" as="h3">Eric Zayas</Header>
                <Header.Subheader>
                  <a href="https://github.com/Eric-Zayas">
                    <Icon size="big" name="github alternate" />
                  </a>
                </Header.Subheader>
              </Grid.Column>
              </Grid.Row>
            </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default About;