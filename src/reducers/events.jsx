import {REQUEST_EVENTS, RECIEVE_EVENTS, SELECT_STATE, INVALIDATE} from '../actions/eventActions.js';
import {recieveEvents } from '../actions/eventActions.js';

const selectState = () => {};

const events = (state = {}, action) => {
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
      break;
    case 'ADD_EVENT':
      console.log('adding event to state', state.eventsList);
      return {
        ...state,
        eventsList: [...state.eventsList, action.eventInfo],
        visibleEvents: [...state.visibleEvents, action.eventInfo],
        ...state.user,
      };

    case 'RECEIVE_EVENTS': {   
      return {...state,
        events: action.payload


      }
    }
  }
  return state;
};

export default events;

        // Object.assign({},state,{
        //   events : action.payload
        // })