import React from 'react';
import moment from 'moment';
import { Grid, Icon, List, Header, Divider } from 'semantic-ui-react';
import '../../public/styles/gridEvent.scss';

function GridEvent(props) {
  const { event, handleElementClick } = props;
  const segmentStyle = {
    background: `url(${event.img_url}) no-repeat`,
    backgroundSize: '100%',
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
          {/*<Divider fitted />
          <p className="event-description">
            {event.description}
          </p>
          <Divider />*/}
        </div>
      </div>
    </Grid.Column>
  );
}

export default GridEvent;
