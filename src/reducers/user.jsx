const initalState = {
  id: 1000,
  display_name: 'Jian Yang',
  age: 20,
  email: 'mr_jian_yang@lfm.io',
  bio: "Question for you: What's better than one Octopus recipe? Answer for you: Eight Octopus Recipes",
  cell: '555-555-5555',
  created_at: '2017-05-22',
  img_url: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5919b7dcff7c50802f096d27/1494857695234/',
  authenticated: false,
};

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
