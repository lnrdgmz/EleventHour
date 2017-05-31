import React from 'react';
import PropTypes from 'prop-types';
import Attendee from './Attendee';

const Attendees = (props) => {
  const numApproved = props.users.filter(user => user.role === 'approved').length;

  return (
    <div className="attendees">
      {
        props.users.filter(user => user.role !== 'creator').map((user) => {
          return (
            <Attendee
              user={user}
              handleClick={props.handleClick}
              full={numApproved >= props.needs}
            />
          );
        })
      }
    </div>
  );
};

Attendees.propTypes = {
  users: PropTypes.object.isRequired,
  needs: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Attendees;
