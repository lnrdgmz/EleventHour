import moment from 'moment';

let nextEventId = 0;

export function addEvent(eventInfo) {
  nextEventId += 1;
  return ({
    type: 'ADD_EVENT',
    id: nextEventId,
    eventInfo,
  });
}

export function removeEvent(event) {
  return ({
    type: 'DELETE_EVENT',
    id: event.id,
    eventInfo,
  });
}

export function setVisibilityFilter(filter) {
  return ({
    type: 'SET_VISIBILITY_FILTER',
    filter,
  });
}

export function createEvent(event) {
  console.log('CREATE EVENT ACTION CREATOR CALLED');
  event.date_time = moment(event.date + ':' + event.time);
  delete event.date;
  delete event.time;
  delete event.dateFlag;
  return function (dispatch) {
    console.log('DISPATCHED');
    fetch('/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
    .then(resp => resp.json())
    .then(body => dispatch(addEvent(body)))
    .catch(err => console.error(err));
  };
}
