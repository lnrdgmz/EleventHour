import React from 'react';
import moment from 'moment';
import Event from '../components/Event';

class EventContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather() {
    const { user } = this.props;
    const geoLoc = this.props.event.lat + ',' + this.props.event.lng;
    const time = moment(this.props.event.date_time).format('X');

    fetch(`/api/weather?info=${time}&loc=${geoLoc}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const arr = [];
        arr.push(data.hourly.summary);
        arr.push(data.hourly.data[0].temperature);
        this.setState({ weather: arr });
      });
  }
  render() {
    return (
      <Event
        {...this.props}
        weather={this.state.weather}
      />
    );
  }
}

export default EventContainer;
