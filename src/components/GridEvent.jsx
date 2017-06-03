import React from 'react';
import moment from 'moment';
import { Grid, Icon, Segment, Header, Divider } from 'semantic-ui-react';

function GridEvent(props) {
  const { event } = props;

  const segmentStyle = {
    background: "url('https://static.pexels.com/photos/39562/the-ball-stadion-football-the-pitch-39562.jpeg') no-repeat",
    backgroundSize: '100%',
  };


  return (
    <Grid.Column textAlign="left" verticleAlign="middle" className="box">
      <div basic className="event-item" style={segmentStyle}>
        <Header className="event-title">
          {event.title}
        </Header>
        <Divider clearing />
        <ul>
          {Boolean(event.date_time) &&
            <span className="event-item-meta event-item-date">
              <Icon name="calendar" />
              {moment(event.date_time).calendar()}
            </span>
          }
          {Boolean(event.location) &&
            <span className="event-item-meta event-item-location">
              <Icon name="location arrow" />
              {event.location}
            </span>
          }
          {Boolean(event.needs) &&
            <span className="event-item-meta event-item-needs">
              <Icon name="search" />
              {event.needs}
            </span>
          }
        </ul>
        <Divider />
        <p className="event-description">
          {event.description}
        </p>
        <Divider />

      </div>
    </Grid.Column>
  );
}

export default GridEvent;
