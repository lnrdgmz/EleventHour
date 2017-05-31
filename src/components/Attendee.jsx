import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'semantic-ui-react';

const Attendee = (props) => {
  let bottom;
  if (props.user.role === 'approved') {
    bottom = (
      <h1>
        Approved!
        <Button basic color="red" user={props.user} status="pending" onClick={props.handleClick}>Undo</Button>
      </h1>
  );
  } else if (props.user.role === 'declined') {
    bottom = (
      <h1>
        Declined
        <Button basic color="red" user={props.user} status="pending" onClick={props.handleClick}>Undo</Button>
      </h1>
    );
  } else if (props.full) {
    bottom = <h1>No more needed</h1>;
  } else {
    bottom = (
      <div className="ui two buttons">
        <Button basic color="green" user={props.user} status="approved" onClick={props.handleClick}>Approve</Button>
        <Button basic color="red" user={props.user} status="declined" onClick={props.handleClick}>Decline</Button>
      </div>
    );
  }
  return (
    <Card>
      <Image src={props.user.img_url} />
      <Card.Content>
        <Card.Header>
          {props.user.display_name}
        </Card.Header>
        <Card.Description>
          {props.user.bio}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        {bottom}
      </Card.Content>
    </Card>
  );
};

Attendee.propTypes = {
  user: PropTypes.object.isRequired,
  full: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Attendee;
