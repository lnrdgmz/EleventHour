
export const changeUser = (user) => {
  console.log('Called');
  return {
    type: 'LOGIN_USER',
    payload: user,
  };
};

export const loginUser = () => {
  return function (dispatch) {
    fetch('/auth/loggedIn', { credentials: 'include' })
      .then((res) => {
        console.log('Response Received');
        return res.json();
      })
      .then((data) => {
        console.log('JSON Data Received');
        if (data !== false) {
          dispatch(changeUser(data));
        }
      })
      .catch((err) => {
        console.error('Fetch User Error:', err, '(Actions: 26)');
      });
  };
};

