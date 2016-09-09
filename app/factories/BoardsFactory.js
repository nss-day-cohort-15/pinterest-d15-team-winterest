'use strict';

app.factory('BoardsFactory', ($q, $http, FirebaseURL) => {
  let createBoard = (boardObj) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}/boards.json`, JSON.stringify(boardObj))
        .success((objFromFirebase) => {
          resolve(objFromFirebase);
        })
        .error((errorFromFirebase) => {
          reject(errorFromFirebase);
        });
    });
  };

  return {
    createBoard
  };
});
