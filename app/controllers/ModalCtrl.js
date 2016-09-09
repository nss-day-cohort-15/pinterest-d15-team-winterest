'use strict';

app.controller('ModalCtrl', function($scope, $uibModalInstance, AuthFactory, BoardsFactory) {
  $scope.board = {
    title: '',
    description: '',
  };

  $scope.create = () => {
    $scope.board.uid = AuthFactory.getUserId();
    BoardsFactory.createBoard($scope.board);
    $scope.board = {};
    $uibModalInstance.close();
  };

  $scope.close = () => {
    $uibModalInstance.close();
    $scope.board = {};
  };
});
