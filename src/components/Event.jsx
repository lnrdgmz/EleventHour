import React from 'react';
import moment from 'moment';
import { Card, Image, Button, Rating, Header, Divider } from 'semantic-ui-react';

function Event(props) {
  const { event, deleteClick, changeModalFocusClick } = props;
  const role = event.role;
  const roleStyle = {
    color: 'green',
  };

  if (role === 'declined') {
    roleStyle.color = 'red';
  } else if (role === 'pending') {
    roleStyle.color = 'orange';
  }
  
  return (

    <Card centered >
      <Image src={event.img_url} />
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
          <p>{props.weather[1]}</p>
          <p>{props.weather[0]}</p>
          <Header sub>Required Skill: </Header>
          <Rating defaultRating={event.skill_level} maxRating={5} disabled />
        </Card.Description>
      </Card.Content>
      <Card.Content extra >
        {role === 'creator' ? (
          event.full ? (
            <span>
              <p>This event's roster is curently <strong style={roleStyle}>full</strong>!
              </p>
              <Button negative onClick={deleteClick(event)}>Delete Event</Button>
            </span>
          ) : (
            <Button.Group widths={2}>
              <Button onClick={() => changeModalFocusClick('Modal')} >View Roster</Button>
              <Button.Or />
              <Button negative onClick={() => deleteClick(event)}>Delete Event</Button>
            </Button.Group>
          )
        ) : (
          <span> Your current status for this event: <strong style={roleStyle}>{role.toUpperCase}</strong></span>
        )}
      </Card.Content>
    </Card>
  );
}

export default Event;
