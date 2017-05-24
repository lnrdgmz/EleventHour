import moment from 'moment';
let nextEventId = 0;

export const addEvent = eventInfo => ({
  type: 'ADD_EVENT',
  id: nextEventId += 1,
  eventInfo,
});

export const removeEvent = event => ({
  type: 'DELETE_EVENT',
  id: event.id,
  eventInfo,
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export function createEvent(event) {
  console.log('CREATE EVENT ACTION CREATOR CALLED');
  event.date_time = moment(event.date + ':' + event.time);
  delete event.date;
  delete event.time;
  return function (dispatch) {
    console.log('DISPATCHED');
    fetch('/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
    .then((resp) => {
      resp.json()
        .then((body) => {
          console.log(body);
          dispatch(addEvent(resp.body));
        });
    })
    .catch(err => console.error(err));
  };
}
