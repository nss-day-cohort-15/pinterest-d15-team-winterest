'use strict';

app.controller('NavCtrl', function($scope, AuthFactory) {
  // Logs out current user
  $scope.logout = () => {
    AuthFactory.logout()
      .then((logoutData) => {
        console.log('Logged out.', logoutData);
      });
  };
});
