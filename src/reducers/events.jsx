const initialState = {
  eventsList: [],
  visibleEvents: [],
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return {
        ...state,
        eventsList: action.payLoad,
        visibleEvents: action.payLoad.slice(0, 51),
      };

    default:
      return state;
  }
};

export default events;
