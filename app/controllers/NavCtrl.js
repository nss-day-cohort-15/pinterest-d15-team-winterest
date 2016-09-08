'use strict';

app.controller('NavCtrl', function($scope, AuthFactory, $window) {
  // Logs out current user
  $scope.logout = () => {
    AuthFactory.logout()
    .then((logoutData) => {
      $window.location.href = '#/login';
      console.log('Logged out', logoutData);
    });
  };

  firebase.auth().onAuthStateChanged(function(user) {
    $scope.isLoggedIn = AuthFactory.isAuthenticated();
  });
});