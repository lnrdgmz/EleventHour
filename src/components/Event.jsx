import React from 'react';
 // import {render} from 'react-dom';

function Event(props) {
  const { event } = props;
  return (
    <div>
      <h3>{event.title} </h3>
      <p> {event.description} </p>
    </div>
  );
}

export default Event;
