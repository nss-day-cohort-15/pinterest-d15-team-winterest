'use strict';

app.controller('ModalCtrl', function($uibModalInstance, $scope) {
  $scope.close = () => {
    $uibModalInstance.close();
  };
});
