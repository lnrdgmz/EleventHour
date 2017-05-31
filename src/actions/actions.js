export const getEvents = ({ data }) => {
  data.forEach((event, index) => { event.id = index; });
  return {
    type: 'GET_EVENTS',
    payload: data,
  };
};

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

export function removeEvent(event) {
  return ({
    type: 'REMOVE_EVENT',
    payload: event.id,
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
    .then(resp => dispatch(removeEvent(event)))
    .catch(err => console.error(err));
  };
}
