import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Card, Image, Button, Rating, Header, Divider } from 'semantic-ui-react';
import DeleteButton from '../containers/DeleteButton';

function Event(props) {
  const { event } = props;
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
          <Header sub>Required Skill: </Header>
          <Rating defaultRating={event.skill_level} maxRating={5} disabled />
        </Card.Description>
      </Card.Content>
      <Card.Content extra >
        {role === 'Creator' ? (
          event.full ? (
            <span>
              <p>This event's roster is curently <strong style={roleStyle}>full</strong>! 
              </p>
              <DeleteButton event={event} />
            </span>
          ) : (
            <Button.Group widths={2}>
              <Button >View Roster</Button>
              <Button.Or />
              <DeleteButton event={event} />
            </Button.Group>
          )
        ) : (
          <span> Your current status for this event: <strong style={roleStyle}>{role}</strong></span>
        )}
      </Card.Content>
    </Card>
  );
}

export default Event;
