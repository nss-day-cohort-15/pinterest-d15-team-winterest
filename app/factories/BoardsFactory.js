'use strict';

app.factory('BoardsFactory', ($q, $http, FirebaseURL, AuthFactory) => {
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

  let getBoards = ()=>{
    let boards = [];
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}boards.json?orderBy="uid"&equalTo="${AuthFactory.getUserId()}"`)
        .success((objFromFirebase) => {
          Object.keys(objFromFirebase).forEach((key)=>{
            objFromFirebase[key].id = key;
            boards.push(objFromFirebase[key]);
          });
          resolve(boards);
        })
        .error((errorFromFirebase) => {
          reject(errorFromFirebase);
        });
    });
  };

  let getSingleBoard = (boardId)=> {
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}boards/${boardId}.json`)
        .success((singleBoard) => {
          resolve(singleBoard)
        });
    });
  };

  return {
    createBoard,
    getBoards,
    getSingleBoard
  };
});
