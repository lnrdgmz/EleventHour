import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteEvent } from '../actions/actions';

class DeleteButton extends Component {
  constructor(props) {
    super(props);

    this.deleteClick = this.deleteClick.bind(this);
  }

  deleteClick = () => this.props.deleteEvent(this.props.event)

  render =() => <Button negative onClick={this.deleteClick}>Delete Event</Button>

}

const mapStateToProps = (state, { event }) => ({ event });

DeleteButton.propTypes = {
  deleteEvent: PropTypes.func,
  event: PropTypes.object,
};

export default connect(
  mapStateToProps,
  {
    deleteEvent,
  },
)(DeleteButton);
