let nextEventId = 0;

export const addEvent = eventInfo => ({
  type: 'ADD_EVENT',
  id: nextEventId + 1,
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

export const createEvent = (event) => {
  return (dispatch) => {
    fetch('/events', {
      method: 'POST',
      body: event,
    })
    .then(resp => dispatch(addEvent(resp.data)))
    .catch(err => console.error(err));
  };
};
