import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Container, Header, Grid, Divider, Modal, Card } from 'semantic-ui-react';
import { deleteEvent, updateAttendeeStatus, loginUser, leaveEvent } from '../actions/actions';
import Event from '../components/Event';
import EventContainer from '../containers/EventContainer';
import AttendeeContainer from '../containers/AttendeeContainer';

class UserEvents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      creatorVisibile: true,
      modalFocus: undefined,
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
  }

  filterClick = (flag) => {
    if (flag) this.setState({ creatorVisibile: true });
    else this.setState({ creatorVisibile: false });
  }

  toggleConfirm() {
    this.setState((prevState) => {
      return {
        showConfirmButtons: !prevState.showConfirmButtons,
      };
    });
  }

  changeModalFocusClick = (focusTag) => {
    this.setState({ modalFocusTag: focusTag, showConfirmButtons: false });
  }

  deleteClick = event => this.props.deleteEvent(event);



  handleLeaveClick(user, event) {
    this.props.leaveEvent(user, event);
    this.setState({ showConfirmButtons: false });
  }


  render = () => {
    const { user } = this.props;
    const { creatorVisibile } = this.state;
    const filteredListLength = user.events.filter(event => creatorVisibile ? event.role === 'creator' : event.role !== 'creator').length;

    return (
      <Container className="userEvents-container">
        <Grid centered columns={4} textAlign="center">
          <Grid.Column >
            <Header as="h1" >
              Your Events
              {this.state.modalFocusTag}
              {this.state.modalFocusTag === 'Event'}
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
            user.events.filter(event => this.state.creatorVisibile ? event.role === 'creator' : event.role !== 'creator')
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
                    <Modal
                      dimmer="blurring"
                      trigger={<Button  onClick={this.getWeather}>More info</Button>}
                      onClose={() => this.changeModalFocusClick('Event')}
                      basic
                      size="small"
                    >
                      {this.state.modalFocusTag === 'Event' ? (
                      
                        <EventContainer
                          parent="User"
                          event={event}
                          user={this.props.user}
                          deleteClick={this.deleteClick}
                          handleLeaveClick={this.handleLeaveClick}
                          changeModalFocusClick={this.changeModalFocusClick}
                          showConfirmButtons={this.state.showConfirmButtons}
                          toggleConfirm={this.toggleConfirm}
                        />

                      ) : (
                        <AttendeeContainer eventId={event.id} changeModalFocusClick={this.changeModalFocusClick} />
                      )}
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
    updateAttendeeStatus,
    loginUser,
    leaveEvent,
  },
)(UserEvents);
