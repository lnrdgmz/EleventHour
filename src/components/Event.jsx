import React from 'react';
import moment from 'moment';
import { Card, Image, Button, Rating, Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function Event(props) {
  const { event, deleteClick, changeModalFocusClick, parent } = props;
  const role = event.role;
  const roleStyle = {
    color: 'green',
  };

  if (role === 'declined') {
    roleStyle.color = 'red';
  } else if (role === 'pending') {
    roleStyle.color = 'orange';
  }

  const imgStyle = {
    height: '220px',
  };

  let bottomPart;
  if (props.showConfirmButtons) {
    bottomPart = (
      <div>
        <span>Are you sure you want to leave this event?</span>
        <Button onClick={props.toggleConfirm}>No</Button>
        <Button negative onClick={props.handleLeaveClick.bind(null, props.user, props.event)} >Yes</Button>
      </div>
    );
  } else if(role) {
    bottomPart = (
      <div>
        <span>Your current status for this event: <strong style={roleStyle}>{role.toUpperCase()}</strong></span>
        <Button negative onClick={props.toggleConfirm}>Leave Event</Button>
      </div>
    );
  }

  return (

    <Card centered fluid>
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
          <Header sub>Required Skill: </Header>
          <Rating defaultRating={event.skill_level} maxRating={5} disabled />
        </Card.Description>
      </Card.Content>
      { parent === 'User' &&
        <Card.Content extra >
          {role === 'creator' ? (
            event.full ? (
              <span>
                <p>This event's roster is curently <strong style={roleStyle}>full</strong>!
                </p>
                <Button negative onClick={() => deleteClick(event)}>Delete Event</Button>
              </span>
            ) : (
              <Button.Group widths={2}>
                <Button onClick={() => changeModalFocusClick('Modal')} >View Roster</Button>
                <Button.Or />
                <Button negative onClick={() => deleteClick(event)}>Delete Event</Button>
              </Button.Group>
            )
          ) : (
            bottomPart
          )}
      </Card.Content>
      }
    </Card>
  );
}

Event.propTypes = {
  showConfirmButtons: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  deleteClick: PropTypes.func.isRequired,
  handleLeaveClick: PropTypes.func.isRequired,
  toggleConfirm: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Event;
