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
    case 'REMOVE_EVENT':
      return [
        ...state.eventsList.slice(0, action.payload),
        ...state.eventsList.slice(action.payload + 1),
      ];
    default:
      return state;
  }
};

export default events;
