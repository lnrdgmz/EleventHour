import React from 'react';
import moment from 'moment';
import { Grid, Icon, List, Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../public/styles/gridEvent.scss';

function GridEvent(props) {
  const { event, handleElementClick } = props;
  const segmentStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .7)), url(${event.img_url}) no-repeat`,
    backgroundSize: '100%',
    transitionDuration: '1s',
  };

  return (
    <Grid.Column textAlign="left" className="box" onClick={() => handleElementClick(event)}>
      <div className="event-item" style={segmentStyle}>
        <div className="buffer">
          <Header className="event-title">
            {}...
          </Header>
          <Divider fitted />
          <List divided horizontal size="tiny" relaxed="very">
            {Boolean(event.date_time) &&
              <List.Item className="event-item-meta event-item-date">
                <List.Icon name="calendar" />
                <List.Content> {moment(event.date_time).calendar()} </List.Content>
              </List.Item>
            }
            {Boolean(event.location) &&
              <List.Item className="event-item-meta event-item-location">
                <List.Icon name="location arrow" />
                <List.Content> {event.location} </List.Content>
              </List.Item>
            }
            {Boolean(event.needs) &&
              <List.Item className="event-item-meta event-item-needs">
                <List.Icon name="search" />
                <List.Content> {event.needs} </List.Content>
              </List.Item>
            }
          </List>
        </div>
      </div>
    </Grid.Column>
  );
}

GridEvent.PropTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    date_time: PropTypes.string,
    full: PropTypes.number,
    needs: PropTypes.number,
    category: PropTypes.string,
    img_url: PropTypes.string,
    location: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    skill_level: PropTypes.number,
    habitat: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  handleElementClick: PropTypes.func.isRequired,
};

export default GridEvent;
