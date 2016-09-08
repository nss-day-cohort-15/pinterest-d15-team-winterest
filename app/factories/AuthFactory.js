'use strict';

app.factory('AuthFactory', ($q) => {

  var uid = null;

  let setUserId = (userId) => {
    uid = userId;
  };

  let getUserId = () => {
    return uid;
  };

  let createUser = (userObj) => {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.Message;
    });
  };

  let loginUserWithEmail = (userObj) => {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    .then((userData) => {
      uid = userData.uid;
      return $q.resolve(userData);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.Message;
      console.error(errorCode, errorMessage);
    });
  };

  let loginUserWithGoogle = function(){
    let provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider)
      .then((userData) => {
        uid = userData.uid;
        return $q.resolve(userData);
      })
      .catch(function(error){
        let errorMessage = error.message;
        console.log("Oops, there was an error logging in", errorMessage);
    });
  };


  let logout = () => {
    return firebase.auth().signOut();
  };

  let isAuthenticated = () => (firebase.auth().currentUser) ? true : false;

  return {
    createUser,
    isAuthenticated,
    loginUserWithEmail,
    loginUserWithGoogle,
    logout
  };
});
