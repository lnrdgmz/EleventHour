import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'semantic-ui-react';
import Attendee from './Attendee';

const Attendees = (props) => {
  const { users, changeModalFocusClick } = props;
  const numApproved = users.filter(user => user.role === 'approved').length;
  const guests = users.filter(user => user.role === 'creator');

  return (
    <Card.Group itemsPerRow={1} stackable>
      {
        guests > 0 ? (
          users.filter(user => user.role !== 'creator').map((user) => {
            return (
              <Attendee
                key={user.id}
                user={user}
                handleClick={props.handleClick}
                full={numApproved >= props.needs}
              />
            );
          })
        ) : (
          <Card>
            <Card.Content>
              <Card.Header>
                There is currently nobody signed up for this event.
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Button onClick={() => changeModalFocusClick('Event')}>
                Go Back
              </Button>
            </Card.Content>
          </Card>
        )
      }
    </Card.Group>
  );
};

Attendees.propTypes = {
  users: PropTypes.object.isRequired,
  needs: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Attendees;
