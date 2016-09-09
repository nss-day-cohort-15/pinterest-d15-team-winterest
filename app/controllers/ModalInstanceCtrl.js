"use strict";

app.controller("ModalInstanceCtrl", function($scope, $modalInstance, $modal, item){
  $scope.name = 'theNameHasBeenPassed';

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});