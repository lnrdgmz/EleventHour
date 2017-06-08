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

// export function createEvent(event) {
//   console.log('CREATE EVENT ACTION CREATOR CALLED');
//   event.date_time = moment(event.date + ':' + event.time);
//   delete event.date;
//   delete event.time;
//   delete event.dateFlag;
//   return function (dispatch) {
//     console.log('DISPATCHED');
//     fetch('/events', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(event),
//     })
//     .then(resp => resp.json())
//     .then(body => dispatch(addEvent(body)))
//     .catch(err => console.error(err));
//   };
// }

export function removeEvent(event) {
  return ({
    type: 'REMOVE_EVENT',
    id: event.id,
    eventInfo,
  });
}

export function deleteEvent(event) {
  return function (dispatch) {
    console.log('DISPATCHED');
    fetch(`/events/${event.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
    .then(resp => resp.json())
    .then(body => dispatch(removeEvent(body)))
    .catch(err => console.error(err));
  };
}

export function editEvent(event) {
  return ({
    type: 'EDIT_EVENT',
    id: event.id,
    eventInfo
  });
}

export function updateEvent(event) {
  event.date_time = moment(event.date + ':' + event.time);
  const eventId = event.id;
  delete event.id;
  delete event.date;
  delete event.time;
  delete event.dateFlag;
  return function (dispatch) {
    console.log('DISPATCHED');
    fetch(`/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
    .then(resp => resp.json())
    .then(body => dispatch(editEvent(body)))
    .catch(err => console.error(err));
  };
}

export function approveUserSignup(event, user) {
  return ({
    type: 'APPROVE_USER_SIGNUP',
    eventId: event.id,
    userId: user.id,
  });
}

export function declineUserSignup(event, user) {
  return ({
    type: 'DECLINE_USER_SIGNUP',
    eventId: event.id,
    userId: user.id,
  });
}

export function updateAttendeeStatus(event, user, flag) {
  return function (dispatch) {
    fetch('/attendees', {
      method: 'PUT',
      body: {
        userId: user.id,
        eventId: event.id,
        flag,
      },
    })
    .then(resp => resp.json())
    .then((body) => {
      if (body.flag === 'Declined') {
        dispatch(declineUserSignup(event, user));
      } else {
        dispatch(approveUserSignup(event, user));
      }
    });
  };
}

export function setVisibilityFilter(filter) {
  return ({
    type: 'SET_VISIBILITY_FILTER',
    filter,
  });
}
