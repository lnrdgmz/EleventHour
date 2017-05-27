import { changeUser } from '../actions/actions.js';

const initalState = {
  userId: 42691,
  username: 'Guest',
  age: 18,
  email: 'guest@lfm.io',
  bio: "You're our guest! Make yourself at home!",
  cell: '555-555-5555',
  created_at: '2017-05-22',
  authenticated: false,
};

const user = (state = initalState, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOGIN_USER':
      console.log('LOGIN REDUCER CALLED!');
      return Object.assign({}, state, action.payload);
    case 'UPDATE_USER':
      console.log('Update user reducer called');
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
};

export default user;
