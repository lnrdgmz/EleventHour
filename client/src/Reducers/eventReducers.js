const initialState = {
  events: []
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [
        ...state,
        Object.assign({}, action.event, { visible: true }),
      ];
    // Remove Event
    case 'REMOVE_EVENT':
      return [
        ...state.events.slice(0, action.payload),
        ...state.events.slice(action.payload + 1),
      ];
    // Join Event
    // Leave Event
    // Other
    default:
      return state;
  }
};

export default events;
