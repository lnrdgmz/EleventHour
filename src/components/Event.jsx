import React from 'react';
import moment from 'moment';
import { Card, Image, Button, Rating, Header, Divider, Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LoginModal from '../components/LoginModal';

function Event(props) {
  const { event, deleteClick, changeModalFocusClick, parent, user, joinEvent } = props;

  let bottomPart;
  const roleStyles = { creator: 'green', approved: 'green', pending: 'orange', declined: 'red' };
  const imgStyle = {
    height: '220px',
  };

  if (parent === 'User') {
  // parent === user
    const role = event.role;
    const roleStyle = { color: roleStyles[role] };
    if (role === 'creator') {
    // role === creator
      event.full ? (
      // event is full
        bottomPart = (
          <Card.Content extra >
            <p>This event's roster is curently <strong style={roleStyle}>full</strong>!</p>
            <Button negative onClick={() => deleteClick(event)}>Delete Event</Button>
          </Card.Content>
        )
      ) : (
      // event is not full
        bottomPart = (
          <Card.Content extra >
            <Button.Group widths={2}>
              <Button onClick={() => changeModalFocusClick('Modal')} >View Roster</Button>
              <Button.Or />
              <Button negative onClick={() => deleteClick(event)}>Delete Event</Button>
            </Button.Group>
          </Card.Content>
        )
      );
    } else {
    // role !== creator
      props.showConfirmButtons ? (
      // if show confirm buttons
        bottomPart = (
          <Card.Content extra>
            <span>Are you sure you want to leave this event?</span>
            <Button.Group widths={2}>
              <Button onClick={props.handleLeaveClick.bind(null, props.user, props.event)}> Yes </Button>
              <Button.Or />
              <Button negative onClick={props.toggleConfirm}> No </Button>
            </Button.Group>
          </Card.Content>
        )
      ) : (
        bottomPart = (
          <Card.Content extra>
            <span>
              Your current status for this event:
                <strong style={roleStyle}> {role.toUpperCase()} </strong>
            </span>
            <Button negative onClick={props.toggleConfirm}>Leave Event</Button>
          </Card.Content>
        )
      );
    }
  } else if (parent === 'Grid') {
  // parent === Grid
    user.display_name ? (
    // user exists
      bottomPart = (
        <Card.Content extra>
          <Button onClick={() => joinEvent(user, event)} > Join Event </Button>
          <Label position="bottom right" as='a' color='blue' image>
            <Icon name="mail outline" />
              Message
            <Label.Detail>Veronika - Creator</Label.Detail>
          </Label>
        </Card.Content>
      )
    ) : (
      bottomPart = (
        <Card.Content extra>
          <Card.Header>Log in to join events!</Card.Header>
          <LoginModal />
        </Card.Content>
      )
    );
  }
  
  return (
    <Card centered fluid raised>
      <Image src={event.img_url} style={imgStyle} />
      <Card.Content>
        <Card.Header>
          {event.title}
        </Card.Header>
        <Card.Meta>
          <span className="date">
            Takes place {moment(event.date_time).calendar()}
          </span>
        </Card.Meta>
        <Divider />
        <Card.Description>
          <Header sub className="eventInfoHeader"> Description: </Header>
          {event.description}
          <Header sub className="eventInfoHeader"> Location: </Header>
          {event.location}
          <Header sub className="eventInfoHeader"> Weather: </Header>


          {/*<p>{props.weather[1]}</p>*/}
          {/*<p>{props.weather[0]}</p>*/}


          <Header sub>Required Skill: </Header>
          <Rating defaultRating={event.skill_level} maxRating={5} disabled />
        </Card.Description>
      </Card.Content>
      {bottomPart}
    </Card>
  );
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
