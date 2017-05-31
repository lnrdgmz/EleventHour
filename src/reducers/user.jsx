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
  events: [
    {
      id: 157,
      title: 'Konklab',
      description: 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
      date_time: '2017-04-17T04:00:00.000Z',
      full: 0,
      needs: 5,
      category: '151',
      img_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVDjLfZLPi1JRFMffPzGLNkW7Ni1aJUitI4IWLVpm0RTUohazqkVU0GhjGcGU1NA6dFQ0FX09QVHxVzr+eE9RRMw0NVslPcmn8517nulk',
      location: '54 Bunker Hill Alley',
      skill_level: 1,
      habitat: null,
      created_at: '2017-05-22T20:18:07.000Z',
      updated_at: '2017-05-22T20:18:07.000Z',
      role: 'declined',
    },
    {
      id: 182,
      title: 'Stuff',
      description: 'These are words',
      date_time: '2017-04-17T04:00:00.000Z',
      full: 0,
      needs: 5,
      category: '151',
      img_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVDjLfZLPi1JRFMffPzGLNkW7Ni1aJUitI4IWLVpm0RTUohazqkVU0GhjGcGU1NA6dFQ0FX09QVHxVzr+eE9RRMw0NVslPcmn8517nulk',
      location: '54 Bunker Hill Alley',
      skill_level: 1,
      habitat: null,
      created_at: '2017-05-22T20:18:07.000Z',
      updated_at: '2017-05-22T20:18:07.000Z',
      role: 'Creator',
    },
    {
      id: 80,
      title: 'Duncan\'s Birthday',
      description: 'These are words that noone will read',
      date_time: '2017-04-17T04:00:00.000Z',
      full: 1,
      needs: 0,
      category: '151',
      img_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVDjLfZLPi1JRFMffPzGLNkW7Ni1aJUitI4IWLVpm0RTUohazqkVU0GhjGcGU1NA6dFQ0FX09QVHxVzr+eE9RRMw0NVslPcmn8517nulk',
      location: '54 Bunker Hill Alley',
      skill_level: 1,
      habitat: null,
      created_at: '2017-05-22T20:18:07.000Z',
      updated_at: '2017-05-22T20:18:07.000Z',
      role: 'Creator',
    },
    {
      id: 22,
      title: 'Some things \'nStuff',
      description: 'These are words',
      date_time: '2017-04-17T04:00:00.000Z',
      full: 0,
      needs: 5,
      category: '151',
      img_url: 'https://images.pond5.com/nighttime-illuminated-soccer-field-pitch-footage-023627543_prevstill.jpeg',
      location: '54 Bunker Hill Alley',
      skill_level: 1,
      habitat: null,
      created_at: '2017-05-22T20:18:07.000Z',
      updated_at: '2017-05-22T20:18:07.000Z',
      role: 'pending',
    },
    {
      id: 123,
      title: 'Another thing',
      description: 'These are words',
      date_time: '2017-04-17T04:00:00.000Z',
      full: 0,
      needs: 5,
      category: '151',
      img_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVDjLfZLPi1JRFMffPzGLNkW7Ni1aJUitI4IWLVpm0RTUohazqkVU0GhjGcGU1NA6dFQ0FX09QVHxVzr+eE9RRMw0NVslPcmn8517nulk',
      location: '54 Bunker Hill Alley',
      skill_level: 1,
      habitat: null,
      created_at: '2017-05-22T20:18:07.000Z',
      updated_at: '2017-05-22T20:18:07.000Z',
      role: 'approved',
    },
  ],
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
