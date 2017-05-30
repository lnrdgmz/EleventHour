import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Container, Header, Icon, Grid, Divider, Modal } from 'semantic-ui-react';
import { deleteEvent, updateEvent, updateAttendeeStatus } from '../actions/actions';
import Event from '../components/Event';

class UserEvents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      creatorVisibile: true,
      user: {
        id: 160,
        oauth_provider: 'google',
        provider_id: '103284368082473861940',
        display_name: 'Kendrick Schuettler',
        img_url: null,
        contact_number: null,
        email: null,
        bio: null,
        age: null,
        created_at: '2017-05-22T20:29:41.000Z',
        updated_at: '2017-05-22T20:29:41.000Z',
        events: [
          {
            id: 157,
            title: 'Konklab',
            description: 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
            date_time: '2017-04-17T04:00:00.000Z',
            full: 0,
            needs: 5,
            category: '151',
            img_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVDjLfZLPi1JRFMffPzGLNkW7Ni1aJUitI4IWLVpm0RTUohazqkVU0GhjGcGU1NA6dFQ0FX09QVHxVzr+eE9RRMw0NVslPcmn8517nulk',
            location: '54 Bunker Hill Alley',
            skill_level: 1,
            habitat: null,
            created_at: '2017-05-22T20:18:07.000Z',
            updated_at: '2017-05-22T20:18:07.000Z',
            role: 'declined',
          },
          {
            id: 158,
            title: 'Stuff',
            description: 'These are words',
            date_time: '2017-04-17T04:00:00.000Z',
            full: 0,
            needs: 5,
            category: '151',
            img_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVDjLfZLPi1JRFMffPzGLNkW7Ni1aJUitI4IWLVpm0RTUohazqkVU0GhjGcGU1NA6dFQ0FX09QVHxVzr+eE9RRMw0NVslPcmn8517nulk',
            location: '54 Bunker Hill Alley',
            skill_level: 1,
            habitat: null,
            created_at: '2017-05-22T20:18:07.000Z',
            updated_at: '2017-05-22T20:18:07.000Z',
            role: 'Creator',
          },
        ],
      },
    };

    this.filterClick = this.filterClick.bind(this);
  }

  filterClick = (flag) => {
    // e.preventDefault();
    if (flag) this.setState({ creatorVisibile: true });
    else this.setState({ creatorVisibile: false });
  }

  render = () => {
    const user = this.state.user;
    const divStyle = {
      textAlign: 'center',
    };

    return (
      <Container className="userEvents-container">
        <Grid centered columns={4} textAlign="center">
          <Grid.Column >
            <Header as="h1" icon >
              {user.display_name}'s Events
            </Header>
          </Grid.Column>
          <Grid.Row centered columns={9} verticalAlign="middle">
            <Grid.Column >
              <Icon aria-hidden="true" link className="user big icon" circular onClick={() => this.filterClick(true)} />
              <p style={divStyle}> Created events </p>
            </Grid.Column>
            <span>Or</span>
            <Grid.Column >
              <Icon aria-hidden="true" link className="users big icon" circular onClick={() => this.filterClick(false)} />
              <p style={divStyle}> Joined events </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Grid centered columns={4}>
          {user.events
          .filter(event => this.state.creatorVisibile ? event.role === 'Creator' : event.role !== 'Creator')
          .map((event) => {
            const gridItemStyle = {
              backgroundImg: event.img_url,
            };

            return (
              <Grid.Column className="grid-item" style={gridItemStyle}>
                <Header as="h2" >
                  {event.title}
                </Header>
                <span>
                  Date: {moment(event.date_time).format('LT')}
                </span>
                <Modal trigger={<Button >More info</Button>} basic size="small">
                  <Event key={event.id} event={event} />
                </Modal>
              </Grid.Column>
            );
          })}

        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  {
    deleteEvent,
    updateEvent,
    updateAttendeeStatus,
  },
)(UserEvents);
