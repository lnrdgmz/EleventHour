import React, { Component } from 'react';
import moment from 'moment';
import { Card, Image, Button, Rating, Header, Divider, Label, Icon, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LoginModal from '../components/LoginModal';
import '../../public/styles/event.scss';
import ChatWindow from '../containers/ChatWindow';
import $ from 'jquery';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFocus: false,
      recipient: 0,
    };
    this.bottomPart = this.bottomPart.bind(this);
    this.changeModalState = this.changeModalState.bind(this);
    this.clearModalFocus = this.clearModalFocus.bind(this);
    this.messageCreator = this.messageCreator.bind(this);
  }

  changeModalState(e) {
    this.setState({ modalFocus: true, recipient: $(e.target).text() });
  }

  clearModalFocus(){
    this.setState({ modalFocus: false });
  }

  messageCreator(e) {
    this.setState({ modalFocus: true, recipient: $(e.target).attr("name") });
  }

  bottomPart() {
    const buttonPad = { paddingBottom: '5px' };
    const roleStyles = { creator: 'green', approved: 'green', pending: 'orange', declined: 'red' };
    if (this.props.parent === 'User') {
    // parent === user
      const role = this.props.event.role;
      const roleStyle = { color: roleStyles[role] };
      if (role === 'creator') {
      // role === creator
        return this.props.event.full ? (
          // event is full
          <Card.Content extra >
            <Card.Header style={buttonPad}>
              This event's roster is curently <strong style={roleStyle}>full</strong>!
            </Card.Header>
            <Button negative onClick={this.props.deleteClick.bind(null, this.props.event)}>Delete Event</Button>
          </Card.Content>
        ) : (
          // event is not full
          <Card.Content extra >
            <Button.Group widths={2}>
              <Button onClick={this.props.changeModalFocusClick.bind(null, 'Modal')} >View Roster</Button>
              <Button.Or />
              <Button negative onClick={this.props.deleteClick.bind(null, this.props.event)}>Delete Event</Button>
            </Button.Group>
          </Card.Content>
        );
      } else {
      // role !== creator
        return this.props.showConfirmButtons ? (
        // if show confirm buttons
          <Card.Content extra>
            <Card.Header style={buttonPad} >Are you sure you want to leave this event?</Card.Header>
            <Button.Group widths={2}>
              <Button
                negative
                onClick={this.props.handleLeaveClick.bind(null, this.props.user, this.props.event)}
                content="Yes, Leave event."
              />
              <Button.Or />
              <Button
                negative
                content="No, I don't want to leave the event"
              />
            </Button.Group>
          </Card.Content>
        ) : (
          <Card.Content extra>
            <Card.Header style={buttonPad}>
              Your current status for this event:
                <strong style={roleStyle}> {role.toUpperCase()} </strong>
            </Card.Header>
            <Button negative onClick={this.props.toggleConfirm}>Leave Event</Button>
          </Card.Content>
        );
      }
    } else if (this.props.parent === 'Grid') {
    // parent === Grid
      if (this.props.user.display_name) {
        return !this.props.joinConfirm ? (
          <Card.Content extra>
            <Button
              onClick={() => {
                this.props.joinEvent(this.props.user, this.props.event);
                this.props.toggleJoin();
              }}
            >
              Join Event
            </Button>
            <Button className="message-button" position="bottom right" color="blue" onClick={this.messageCreator} name={this.props.event.creator.id} >
              <Icon name="mail outline" />
                Contact Event Creator
            </Button>
          </Card.Content>
        ) : (
          <Card.Content extra>
            <Card.Header
              content="Success!"
              style={buttonPad}
            />
            <Button
              content="Close"
              onClick={() => {
                this.props.changeModalFocusClick();
                this.props.toggleJoin();
              }}
            />
          </Card.Content>
        );
      } else {
        return (
          <Card.Content extra>
            <Card.Header style={buttonPad}>Log in to join events!</Card.Header>
            <LoginModal />
          </Card.Content>
        );
      }
    }
  }

  render =() => {
    const imgStyle = {
      height: '220px',
    };
    return (
      <Card centered fluid raised>
        <Image src={this.props.event.img_url} style={imgStyle} />
        <Card.Content>
          <Card.Header>
            {this.props.event.title}
          </Card.Header>
          <Card.Meta>
            <span className="date">
              Takes place {moment(this.props.event.date_time).format('ll')}
            </span>
          </Card.Meta>
          <Divider />
          <Card.Description>
            <Header sub className="eventInfoHeader"> Description: </Header>
            <p>{this.props.event.description}</p>
            <Header sub className="eventInfoHeader"> Location: </Header>
            <p>{this.props.event.location}</p>
            <Header sub className="eventInfoHeader"> Weather: </Header>
            {
              this.props.weather ? (
                <div>
                  <p>{this.props.weather[1]}</p>
                  <p>{this.props.weather[0]}</p>
                </div>
              ) : (
                null
              )
            }
            <Header sub className="eventInfoHeader">Required Skill: </Header>
            <Rating style={{ paddingTop: '5px' }} defaultRating={this.props.event.skill_level} maxRating={5} disabled />
          </Card.Description>
        </Card.Content>
        {this.bottomPart()}
      </Card>
    );
  }
}

Event.PropTypes = {
  showConfirmButtons: PropTypes.bool.isRequired,
  joinConfirm: PropTypes.bool.isRequired,
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
