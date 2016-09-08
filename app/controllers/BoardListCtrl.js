'use strict';

app.controller('BoardListCtrl', function($scope, $uibModal) {
  $scope.message = 'Boards be here!';

  $scope.open = () => {
    let modalInstance = $uibModal.open({
      templateUrl: '../partials/ModalView.html',
      controller: 'ModalCtrl'
    });
  };
});
