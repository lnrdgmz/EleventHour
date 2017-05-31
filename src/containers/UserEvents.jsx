import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Container, Header, Icon, Grid, Divider, Modal, Card } from 'semantic-ui-react';
import { deleteEvent, updateEvent, updateAttendeeStatus, loginUser } from '../actions/actions';
import Event from '../components/Event';

class UserEvents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      creatorVisibile: true,
    };

    this.filterClick = this.filterClick.bind(this);
  }

  componentWillReceiveProps = () => {
    this.props.loginUser();
  }

  filterClick = (flag) => {
    if (flag) this.setState({ creatorVisibile: true });
    else this.setState({ creatorVisibile: false });
  }

  render = () => {
    const { user } = this.props;
    const { creatorVisibile } = this.state; 
    const divStyle = {
      textAlign: 'center',
    };
    const filteredListLength = user.events.filter(event => creatorVisibile ? event.role === 'Creator' : event.role !== 'Creator').length;

    return (
      <Container className="userEvents-container">
        <Grid centered columns={4} textAlign="center">
          <Grid.Column >
            <Header as="h1" >
              Your Events
            </Header>
          </Grid.Column>
          <Grid.Row centered columns={6} verticalAlign="middle">
            <Button.Group>
              <Button
                active={creatorVisibile}
                content="Created Events"
                icon="user"
                onClick={() => this.filterClick(true)}
              />
              <Button.Or text="Or" />
              <Button
                active={!creatorVisibile}
                content="Joined Events"
                icon="users"
                onClick={() => this.filterClick(false)}
              />
            </Button.Group>
          </Grid.Row>
        </Grid>
        <Divider section />
        <Card.Group itemsPerRow={3} stackable className="grid-item">
          {filteredListLength === 0 ? (
            <h1>
              You are currently not signed up for any events. Add some events to your calendar <a href="/#/events">Here</a>
            </h1>
          ) : (
            user.events.filter(event => this.state.creatorVisibile ? event.role === 'Creator' : event.role !== 'Creator')
            .map((event) => {
              return (
                <Card centered key={event.id}>
                  <Card.Content>
                    <Card.Header>
                      {event.title}
                    </Card.Header>
                    <Card.Meta>
                      <span className="date">
                        Takes place {moment(event.date_time).calendar()}
                      </span>
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    <Modal dimmer="blurring" trigger={<Button >More info</Button>} basic size="small">
                      <Event event={event} />
                    </Modal>
                  </Card.Content>
                </Card>
              );
            }))}
        </Card.Group>
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
    loginUser,
  },
)(UserEvents);
