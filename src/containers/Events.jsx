// Import React and Redux Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
<<<<<<< HEAD
import { filter } from 'lodash/collection';
import { escapeRegExp } from 'lodash/string';
=======
>>>>>>> feat($searchBar): Added a searchbar to events grid
import SearchInput, { createFilter } from 'react-search-input';
import PropTypes from 'prop-types';

// local dependencies
import { Container, Grid, Divider, Modal } from 'semantic-ui-react';
import MenuBar from '../components/MenuBar';
import GridEvent from '../components/GridEvent';
import Event from '../components/Event';
import { fetchEvents } from '../actions/eventActions';
import { joinEvent } from '../actions/actions';
import '../../public/styles/events.scss';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFocus: false,
      page: 0,
      zipCode: props.match.params.zipCode,
      searchTerm: '',
    };

    this.handleElementClick = this.handleElementClick.bind(this);
  }

// Related to store/state
  getMoreEvents = () => {
    const newPage = this.state.page + 1
    this.setState({ page: newPage });
    this.props.fetchEvents(this.state.zipCode, newPage);
  }

// Related to views
  clearModalFocus = () => this.setState({ modalFocus: false })

  handleElementClick = (event) => {
    this.setState({ modalFocus: event });
  }

  handleJoinEvent = (user, event) => this.props.joinEvent(user, event);

// Related to search

  searchUpdated = term => this.setState({ searchTerm: term });

  render = () => {
    const { eventsList, user } = this.props;

    const KEYS_TO_FILTER = ['title', 'description', 'tags', 'catagories'];
    return (
      <div className="wrapper">
        <MenuBar />
        <Container className="events-page" >
          <Divider />
          <SearchInput
            className="search-input"
            onChange={this.searchUpdated}
          />
          <Divider />
          <Grid centered columns={3} stackable stretched >
            {eventsList === undefined ? null : eventsList
            .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER))
            .map(event => (
              <GridEvent
                key={event.id}
                event={event}
                handleElementClick={this.handleElementClick}
              />
            ))}
          </Grid>
          <Modal
            dimmer="blurring"
            basic
            onClose={() => this.clearModalFocus()}
            size="small"
            open={Boolean(this.state.modalFocus)}
          >
            <Event
              parent="Grid"
              user={user}
              event={this.state.modalFocus}
              deleteClick=""
              changeModalFocusClick=""
              joinEvent={this.handleJoinEvent}
            />
          </Modal>
          <Waypoint
            onEnter={() => this.getMoreEvents()}
          />
        </Container>
      </div>
    );
  }
}

Events.propTypes = {
  joinEvent: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
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
  }),
  eventsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Events.defaultProps = {
  user: PropTypes.shape({}),
};

const mapStatetoProps = ({ events, user }) => ({
  eventsList: events.eventsList,
  user,
});

export default connect(
  mapStatetoProps,
  {
    fetchEvents,
    joinEvent,
  })(Events);
