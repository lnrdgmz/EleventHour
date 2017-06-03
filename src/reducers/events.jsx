import {REQUEST_EVENTS, RECIEVE_EVENTS, SELECT_STATE, INVALIDATE} from '../actions/eventActions.js';

const initialState = { eventsList: [], visibleEvents: [] };

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return {
        ...state,
        eventsList: action.payLoad,
        visibleEvents: action.payLoad.slice(0, 51),
      };
    case 'REMOVE_EVENT':
      return {
        ...state,
        eventsList: {
          ...state.eventsList.slice(0, action.payload),
          ...state.eventsList.slice(action.payload + 1),
        },
      };
    case 'ADD_EVENT':
      console.log('adding event to state', state.eventsList);
      return {
        ...state,
        eventsList: [...state.eventsList, action.eventInfo],
        visibleEvents: [...state.visibleEvents, action.eventInfo],
        ...state.user,
      };

    case 'RECEIVE_EVENTS': {
      return {
        ...state,
        eventsList: state.eventsList.concat(action.payload),
      };
    }
    default: {
      return state;
    }
  }
};

export default events;
