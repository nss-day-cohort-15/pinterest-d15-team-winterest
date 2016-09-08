'use strict';

app.controller('LoginCtrl', function($scope, AuthFactory, $window) {
  $scope.account = {
    email: "",
    password: ""
  };

  $scope.loginWithEmailAndPassword = () => {
    AuthFactory.loginUserWithEmail($scope.account)
    .then((data) => {
      console.log("logged in with email", data);
      AuthFactory.setUserId(data.uid);
      $window.location.href = '#/boards/list';
    });
  };

  $scope.registerWithEmailAndPassword = () => {
    AuthFactory.createUser($scope.account)
    .then((data) => {
      console.log("User registered with email and password", data);
      AuthFactory.loginUserWithEmail($scope.account);
    });
  };

  $scope.loginWithGoogle = () => {
    AuthFactory.loginUserWithGoogle()
    .then((userData) => {
      console.log(userData);
      $window.location.href = '#/boards/list';
      AuthFactory.setUserId(userData.uid);
    });
    console.log('loginWithGoogle clicked');

  };
});
