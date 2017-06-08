import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Container, Header, Grid, Divider, Modal, Card } from 'semantic-ui-react';
import { deleteEvent, updateAttendeeStatus, loginUser, leaveEvent } from '../actions/actions';
import Event from '../components/Event';
import AttendeeContainer from '../containers/AttendeeContainer';
import '../../public/styles/userEvents.scss';

class UserEvents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      creatorVisibile: true,
      focusedEvent: undefined,
      modalFocusTag: 'Event',
      showConfirmButtons: false,
      events: this.props.events,
    };

    this.filterClick = this.filterClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.changeModalFocusClick = this.changeModalFocusClick.bind(this);
    this.handleLeaveClick = this.handleLeaveClick.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
  }

  componentWillMount = () => {
    this.props.loginUser();
    console.log(this.state.events);
  }

  toggleConfirm = () => {
    this.setState(prevState => ({ showConfirmButtons: !prevState.showConfirmButtons }));
  }

  changeModalFocusClick = (focusTag) => {
    this.setState({ modalFocusTag: focusTag, showConfirmButtons: false });
  }

  focusOnEvent = event => this.setState({ focusedEvent: event })
  resetFocusedEvent = () => this.setState({ focusedEvent: undefined })

  deleteClick = event => this.props.deleteEvent(event);

  handleLeaveClick = (user, event) => {
    this.props.leaveEvent(user, event);
    this.setState({ showConfirmButtons: false });
  };

  filterClick = (flag) => {
    if (flag) this.setState({ creatorVisibile: true });
    else this.setState({ creatorVisibile: false });
  }

  render = () => {
    const { user } = this.props;
    const { creatorVisibile } = this.state;
    const filteredListLength = user.events.filter(event => creatorVisibile ? event.role === 'creator' : event.role !== 'creator').length;

    return (
      <Container className="userEvents-container">
        <Grid centered columns={4} textAlign="center">
          <Grid.Column width={16}>
            <Header as="h1" style={{ fontFamily: '$graduate' }} >
              Your Events
            </Header>
          </Grid.Column>
          <Grid.Row centered columns={6} verticalAlign="middle">
            <Button.Group>
              <Button
                className="selector-button"
                active={creatorVisibile}
                content="Created Events"
                icon="user"
                onClick={() => this.filterClick(true)}
              />
              <Button.Or text="Or" />
              <Button
                className="selector-button"
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
            <Header>
              You are currently not signed up for any events. Add some events to your calendar <a href="/#/events">Here</a>
            </Header>
          ) : (
            user.events.filter(event => (this.state.creatorVisibile ? event.role === 'creator' : event.role !== 'creator'))
            .map(event => (
              <Card color="blue" className="event-card" onClick={() => this.focusOnEvent(event)}centered key={event.id}>
                <Card.Content>
                  <Card.Header>
                    {event.title.length > 15 ? `${event.title.slice(0, 14)}...` : event.title }
                  </Card.Header>
                  <Card.Meta>
                    <span className="date">
                      Takes place {moment(event.date_time).calendar()}
                    </span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            )))}
          <Modal
            className="normal-modal"
            dimmer="blurring"
            onClose={() => {
              this.changeModalFocusClick('Event');
              this.resetFocusedEvent();
            }}
            open={this.state.focusedEvent !== undefined}
            basic
            size="small"
          >
            {this.state.modalFocusTag === 'Event' ? (
              <Event
                parent="User"
                event={this.state.focusedEvent}
                user={this.props.user}
                deleteClick={this.deleteClick}
                handleLeaveClick={this.handleLeaveClick}
                changeModalFocusClick={this.changeModalFocusClick}
                showConfirmButtons={this.state.showConfirmButtons}
                toggleConfirm={this.toggleConfirm}
              />

            ) : (
              <AttendeeContainer
                eventId={this.state.focusedEvent.id}
                changeModalFocusClick={this.changeModalFocusClick}
              />
            )}
          </Modal>
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
    updateAttendeeStatus,
    loginUser,
    leaveEvent,
  },
)(UserEvents);
