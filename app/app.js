'use strict';

let app = angular.module('Winterest', ['ngRoute']);

let isAuth = (AuthFactory)=> new Promise((resolve, reject)=>{
  // This will be a boolean and it will resolve if its true, meaning you can access the URLs below
  if(AuthFactory.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});

app.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/Login.html',
      controller: 'LoginCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/Login.html',
      controller: 'LoginCtrl'
    })
    .when('/boards/list', {
      templateUrl: 'partials/BoardList.html',
      controller: 'BoardListCtrl',
      resolve: {isAuth}
    })
    .when('/boards/:boardId', {
      templateUrl: 'partials/BoardSingle.html',
      controller: 'BoardSingleCtrl',
      resolve: {isAuth}
    })
    .otherwise('/');
});

app.run((FbCreds) => {
  firebase.initializeApp(FbCreds);
});