// Import Moment
import moment from 'moment';

// User Actions

export const changeUser = (user) => {
  console.log('User:', user);
  return {
    type: 'LOGIN_USER',
    payload: user,
  };
};

export const loginUser = () => {
  return function (dispatch) {
    fetch('/auth/loggedIn', { credentials: 'include' })
      .then((res) => {
        console.log('Response Received');
        return res.json();
      })
      .then((data) => {
        console.log('JSON Data Received');
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

// Event Actions

export const getEvents = ({ data }) => {
  data.forEach((event, index) => { event.id = index; });
  return {
    type: 'GET_EVENTS',
    payload: data,
  };
};

export function addEvent(eventInfo) {
  nextEventId += 1;
  return ({
    type: 'ADD_EVENT',
    id: nextEventId,
    eventInfo,
  });
}

export const createEvent = (event) => {
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
};
