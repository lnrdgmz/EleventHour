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
      break;
    case 'ADD_EVENT':
      console.log('adding event to state', state.eventsList);
      return {
        ...state,
          eventsList: [...state.eventsList, action.eventInfo],
          visibleEvents: [...state.visibleEvents, action.eventInfo],
        ...state.user,
      };

    default:
      return state;
  }
};

export default events;
