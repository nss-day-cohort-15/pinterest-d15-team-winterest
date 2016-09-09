"use strict";

app.factory('PinsFactory', function ($q, $http, FirebaseURL) {

  let createPin = (newPin) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}/pins.json`, JSON.stringify(newPin))
        .success((objFromFirebase) => {
          resolve(objFromFirebase);
        })
        .error((errorFromFirebase) => {
          reject(errorFromFirebase);
        });
    });
  };


  let getPins = (boardId) => {
    let pins = [];
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}pins.json?orderBy="boardId"&equalTo="${boardId}"`)
        .success((objFromFirebase) => {
          Object.keys(objFromFirebase).forEach((key)=>{
            objFromFirebase[key].id = key;
            pins.push(objFromFirebase[key]);
          });
          resolve(pins);
        })
        .error((errorFromFirebase) => {
          reject(errorFromFirebase);
        });
    });
  }

  return {
    createPin,
    getPins
  }
});
