'use strict';

app.factory('AuthFactory', () => {
  let logout = () => {
    console.log('User is trying to log out.');
  };

  return {
    logout
  };
});
