
// Import Moment
import moment from 'moment';
import $ from 'jquery';
// User Actions


export const changeUser = (user) => {
  return {
    type: 'LOGIN_USER',
    payload: user,
  };
};

export const loginUser = () => {
  return function (dispatch) {
    fetch('/auth/loggedIn', { credentials: 'include' })
      .then(res => res.json())
      .then((data) => {
        if (data !== false) {
          dispatch(changeUser(data));
        }
      })
      .catch((err) => {
        console.error('Fetch User Error:', err, '(Actions: 26)');
      });
  };
};

export const updateUserInfo = (user) => {
  return {
    type: 'UPDATE_USER',
    user,
  };
};

export function removeEvent(event) {
  return ({
    type: 'REMOVE_EVENT',
    payload: event.id,
  });
}

export function deleteEvent(event) {
  return function (dispatch) {
    fetch(`/events/${event.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
    .then(resp => dispatch(removeEvent(event)))
    .catch(err => console.error(err));
  };
}

export function sendMessage(message) {
  return ({
    type: 'SEND_MESSAGE',
    payload: message,
  });
}

// Event Actions

export const getEvents = ({ data }) => {
  data.forEach((event, index) => { event.id = index; });
  return {
    type: 'GET_EVENTS',
    payload: data,
  };
};

export function addEvent(eventInfo) {
  return ({
    type: 'ADD_EVENT',
    eventInfo,
  });
}

export const createEvent = (event) => {
  event.date_time = moment(event.date);
  delete event.date;
  delete event.time;
  delete event.dateFlag;
  return function (dispatch) {
    fetch('/events', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
    .then(resp => resp.json())
    .then(body => dispatch(addEvent(body)))
    .catch(err => console.error(err));
  };
};

export function userLeaveEvent(event) {
  return ({
    type: 'LEAVE_EVENT',
    id: event.id,
  });
}

export const leaveEvent = (user, event) => {
  const reqObj = {
    user_id: user.id,
    event_id: event.id,
  };
  return function (dispatch) {
    fetch('/events/attendees', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqObj),
    })
    .then(() => dispatch(userLeaveEvent(event)))
    .catch(err => console.error(err));
  };
};

export function userJoinEvent(event) {
  return ({
    type: 'JOIN_EVENT',
    payload: event,
  });
}

export function joinEvent(user, event) {
  return function (dispatch) {
    fetch(`events/join/${event.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    .then(() => dispatch(userJoinEvent(event)))
    .catch(err => console.error(err));
  };
}
