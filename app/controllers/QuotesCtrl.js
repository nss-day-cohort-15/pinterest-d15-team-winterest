"use strict";

app.controller("QuotesCtrl", function($scope, ApiFactory){
  ApiFactory.getQuotes()
  .then((quotes)=>{
    $scope.quotes = quotes;
    console.log("$scope.quotes");
  });
});
