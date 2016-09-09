'use strict';

app.factory('BoardsFactory', ($q, $http, FirebaseURL, AuthFactory, PinsFactory) => {
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
          resolve(singleBoard);
        });
    });
  };

  let deleteBoard = (boardId)=> {
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}boards/${boardId}.json`)
        .success((singleBoard) => {
          resolve(singleBoard);
        });
    })
    .then(()=> {
      let pins = [];
      return $q((resolve, reject)=> {
        $http.get(`${FirebaseURL}pins.json?orderBy="boardId"&equalTo="${boardId}"`)
        .success((pinsObj)=> {
          console.log('Pins on board to be deleted: ', pinsObj);
          // Extracting Firebase Id from each pin
          Object.keys(pinsObj).forEach((key) => {
            pins.push(key);
          });
          resolve(pins);
        })
        .error((error)=> {
          console.log('error on deleting pins: ', error);
          reject(error);
        });
      })
      .then((pinsArray) => {
        return $q.all(
          pinsArray.map((pinId) => {
            return PinsFactory.deletePin(pinId);
          })
        );
      });
    });
  };

  let updateBoard = (boardObj, boardId)=>{
    console.log("board object", boardObj);
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}boards/${boardId}.json`, JSON.stringify(boardObj))
        .success((updatedObj)=>{
          resolve(updatedObj);
        })
        .error((error)=>{
          console.log("error", error);
          reject(error);
        });
    });
  };

  return {
    createBoard,
    getBoards,
    getSingleBoard,
    deleteBoard,
    updateBoard
  };
});
