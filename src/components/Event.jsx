import React, { Component} from 'react';
import moment from 'moment';
import { Card, Image, Button, Rating, Header, Divider, Label, Icon, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LoginModal from '../components/LoginModal';
import Inbox from '../containers/Inbox';
import utils from '../utils/utils';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFocus: false,
    };

    this.bottomPart = this.bottomPart.bind(this);
    this.getEventCreator = this.getEventCreator.bind(this);
    this.changeModalState = this.changeModalState.bind(this);
    this.clearModalFocus = this.clearModalFocus.bind(this);
  }
  componentWillMount() {
    console.log(this.props);
    // this.props.events.forEach((event) => {
    //   fetch(`/events/${event.id}`, { credentials: 'include' })
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((data) => {
    //       data.users.forEach((user) => {
    //         if (user.role === 'creator') {
    //           event.creator = user;
    //         }
    //       });
    //     });
    // });
  }
  getEventCreator(event) {
    console.log(this.props);
    fetch(`/events/${event.id}`, { credentials: 'include' })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.users.forEach((user) => {
          if (user.role === 'creator') {
            return user.display_name;
          }
        });
      });
  }
  clearModalFocus(){
    this.setState({ modalFocus: false });
  } 
    

  changeModalState() {
    this.setState({ modalFocus: true });
  }

  bottomPart() {
    const { event, deleteClick, changeModalFocusClick, parent, user, joinEvent } = this.props;
    const roleStyles = { creator: 'green', approved: 'green', pending: 'orange', declined: 'red' };

    if (parent === 'User') {
    // parent === user
      const role = event.role;
      const roleStyle = { color: roleStyles[role] };
      if (role === 'creator') {
      // role === creator
        return event.full ? (
        // event is full
            <Card.Content extra >
              <p>This event's roster is curently <strong style={roleStyle}>full</strong>!</p>
              <Button negative onClick={() => deleteClick(event)}>Delete Event</Button>
            </Card.Content>
        ) : (
        // event is not full
          <Card.Content extra >
            <Button.Group widths={2}>
              <Button onClick={() => changeModalFocusClick('Modal')} >View Roster</Button>
              <Button.Or />
              <Button negative onClick={() => deleteClick(event)}>Delete Event</Button>
            </Button.Group>
          </Card.Content>
        );
      } else {
      // role !== creator
        return this.props.showConfirmButtons ? (
        // if show confirm buttons
            <Card.Content extra>
              <span>Are you sure you want to leave this event?</span>
              <Button.Group widths={2}>
                <Button onClick={this.props.handleLeaveClick.bind(null, this.props.user, this.props.event)}> Yes </Button>
                <Button.Or />
                <Button negative onClick={this.props.toggleConfirm}> No </Button>
              </Button.Group>
            </Card.Content>
        ) : (
            <Card.Content extra>
              <span>
                Your current status for this event:
                  <strong style={roleStyle}> {role.toUpperCase()} </strong>
              </span>
              <Button negative onClick={this.props.toggleConfirm}>Leave Event</Button>
            </Card.Content>
          );
      }
    } else  {
    // parent === Grid
     return this.props.user.display_name ? (
      // user exists
          <Card.Content extra>
            <Button onClick={() => this.props.joinEvent(this.props.user, this.props.event)}> Join Event </Button>
            <Label attached="bottom right" color='blue' image onClick={this.changeModalState}>
              <Icon name="mail outline" />
                { this.props.event.creator.display_name }
              <Label.Detail> - Creator</Label.Detail>
            </Label>
          </Card.Content>
      ) : (
          <Card.Content extra>
            <Card.Header>Log in to join events!</Card.Header>
            <LoginModal />
          </Card.Content>
        );
    }
  }
  
  render() {
    const imgStyle = {
      height: '220px',
    };
    
    return (
      <div>
      <Card centered fluid>
        <Image src={this.props.event.img_url} style={imgStyle} />
        <Card.Content>
          <Card.Header>
            {this.props.event.title}
          </Card.Header>
          <Card.Meta>
            <span className="date">
              Takes place {moment(this.props.event.date_time).calendar()}
            </span>
          </Card.Meta>
          <Divider />
          <Card.Description>
            <Header sub className="eventInfoHeader"> Description: </Header>
            {this.props.event.description}
            <Header sub className="eventInfoHeader"> Location: </Header>
            {this.props.event.location}
            <Header sub className="eventInfoHeader"> Weather: </Header>


            {/*<p>{props.weather[1]}</p>*/}
            {/*<p>{props.weather[0]}</p>*/}


            <Header sub>Required Skill: </Header>
            <Rating defaultRating={this.props.event.skill_level} maxRating={5} disabled />
          </Card.Description>
        </Card.Content>
        {this.bottomPart()}
      </Card>
      <Modal
          dimmer="blurring"
          basic
          onClose={() => this.props.clearModalFocus()}
          size="small"
          open={Boolean(this.state.modalFocus)}
        >
        <Card centered fluid>
          <Inbox />
        </Card>
      </Modal>
      </div>
    );
  }
}

Event.propTypes = {
  showConfirmButtons: PropTypes.bool.isRequired,
  parent: PropTypes.string.isRequired,
  changeModalFocusClick: PropTypes.func.isRequired,
  deleteClick: PropTypes.func.isRequired,
  handleLeaveClick: PropTypes.func.isRequired,
  toggleConfirm: PropTypes.func.isRequired,
  joinEvent: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    date_time: PropTypes.string,
    full: PropTypes.number,
    needs: PropTypes.number,
    category: PropTypes.string,
    img_url: PropTypes.string,
    location: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    skill_level: PropTypes.number,
    habitat: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    oauth_provider: PropTypes.string,
    provider_id: PropTypes.string,
    display_name: PropTypes.string,
    img_url: PropTypes.string,
    contact_number: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    age: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    messages: PropTypes.any,
    events: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Event;