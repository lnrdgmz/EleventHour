import React from 'react';
 // import {render} from 'react-dom';

function Event(props) {
  const { event } = this.props;
  return (
    <section>
      <h3>{event.title} </h3>
      <p> {event.description} </p>
    </section>
  );
}

export default Event;
