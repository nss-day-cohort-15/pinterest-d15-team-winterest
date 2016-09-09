"use strict";

app.controller("SearchCtrl", function($scope, ApiFactory){

  ApiFactory.getQuotes()
  .then((quotes)=>{
    $scope.quotes = quotes;
    console.log("$scope.quotes");
  })

});