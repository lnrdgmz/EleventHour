import React from 'react';
import PropTypes from 'prop-types';
import Attendees from '../components/Attendees';


/**
 * Replace this test data with real data from props for an Ajax call
 */

class AttendeesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      users: [],
      needs: 0,
      eventId: this.props.eventId,
    };
  }
  componentDidMount() {
    fetch(`/events/${this.state.eventId}`)
      .then(resp => resp.json())
      .then((body) => {
        this.setState({
          users: body.users,
          needs: body.needs,
        });
      })
      .catch(err => console.error(err));
  }
  handleClick(ev, data) {
    const requestObj = {
      id: data.user.attendee_id,
      flag: data.status,
    };
    // makes a request to change the status of a user to either approved or declined
    fetch('/events/attendees', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestObj),
    })
    // then update the event to reflect the change
    .then(resp => resp.json())
    .then((body) => {
      this.setState((prevState) => {
        const users = prevState.users.slice();
        const idx = users.findIndex(u => u.attendee_id === body.id);
        users[idx].role = body.flag;
        return users;
      });
    });
  }
  render() {
    return (
      <Attendees
        users={this.state.users}
        needs={this.state.needs}
        handleClick={this.handleClick}
      />
    );
  }
}

AttendeesContainer.propTypes = {
  eventId: PropTypes.number.isRequired,
};

export default AttendeesContainer;
