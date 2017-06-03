// Import React and Redux Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import { filter } from 'lodash/collection';
import { escapeRegExp } from 'lodash/string';

// local dependencies
import { Container, Search, Grid, Divider } from 'semantic-ui-react';
import MenuBar from '../components/MenuBar';
import GridEvent from '../components/GridEvent';
import { fetchEvents } from '../actions/eventActions';
import '../../public/styles/events.scss';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  getMoreEvents = () => {
    this.setState({ page: this.state.page});
    this.props.fetchEvents(this.state.page);
    console.log(this.state.page);
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, result) => this.setState({ value: result.description })

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.description);

      this.setState({
        isLoading: false,
        results: filter(this.props.eventsList, isMatch),
      });
    }, 500);
  }

  render = () => {
    const { eventsList } = this.props;
    const { isLoading, value, results } = this.state;

    return (
      <Container className="events-page" >
        <MenuBar />
        <Search
          loading={isLoading}
          onSearchChange={this.handleSearchChange}
          results={results}
          value={value}
          {...this.props}
        />
        <Divider />
        <Grid centered columns={3} stackable relaxed >
          {eventsList === undefined ? null : eventsList.map((event) => {
            return (
              <GridEvent key={event.id} event={event} />
            );
          })}
        </Grid>
        <Waypoint
          onEnter={() => this.getMoreEvents()}
        />
      </Container>
    );
  }
}

const mapStatetoProps = ({ events }) => ({ eventsList: events.eventsList });

export default connect(
  mapStatetoProps,
  {
    fetchEvents,
  })(Events);
