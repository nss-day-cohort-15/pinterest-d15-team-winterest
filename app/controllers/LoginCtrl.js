'use strict';

app.controller('LoginCtrl', function($scope) {
  $scope.loginWithEmailAndPassword = () => {
    // do things
    console.log('loginWithEmailAndPassword clicked');
  };

  $scope.registerWithEmailAndPassword = () => {
    // do other things
    console.log('registerWithEmailAndPassword clicked');

  };

  $scope.loginWithGoogle = () => {
    // do login with google goodies
    console.log('loginWithGoogle clicked');

  };
});
