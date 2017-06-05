const initalState = {};

const user = (state = initalState, action) => {
  switch (action.type) {

    case 'LOGIN_USER':
      return Object.assign({}, state, action.payload);

    case 'UPDATE_USER':
      return Object.assign({}, state, action.user);

    case 'SEND_MESSAGE':
      return {
        ...state,
        messages: [action.payload.message],
      };
      
    case 'JOIN_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case 'LEAVE_EVENT':
      return {
        ...state,
        events: state.events.filter(item => item.id !== action.id),
      };
    default:
      return state;
  }
};

export default user;
 