export const getEvents = ({ data }) => {
  data.forEach((event, index) => { event.id = index; });
  return {
    type: 'GET_EVENTS',
    payload: data,
  };
};

export const getUser = ({ data }) => {
  return {
    type: 'GET_USER',
    payload: data,
  };
};
