'use strict';

app.controller('ModalCtrl', function($scope, $uibModalInstance, AuthFactory, BoardsFactory, $route) {
  $scope.board = {
    title: '',
    description: ''
  };

  $scope.create = () => {
    $scope.board.uid = AuthFactory.getUserId();
    BoardsFactory.createBoard($scope.board)
    .then(()=>{
      $scope.board = {};
      $uibModalInstance.close();
      return BoardsFactory.getBoards();
    })
    .then((boards)=>{
      console.log("boards", boards);
      $route.reload();
    });
  };

  $scope.close = () => {
    $uibModalInstance.close();
    $scope.board = {};
  };
});
