const initalState = {};

const user = (state = initalState, action) => {
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
