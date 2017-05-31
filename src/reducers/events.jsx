import {REQUEST_EVENTS, RECIEVE_EVENTS, SELECT_STATE, INVALIDATE} from '../actions/eventActions.js';
import {recieveEvents } from '../actions/eventActions.js';

const selectState = () => {};

const events = (state = {}, action) => {
  switch (action.type) {
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