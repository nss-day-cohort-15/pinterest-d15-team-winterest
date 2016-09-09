'use strict';

app.controller('BoardListCtrl', function($scope, $uibModal, boards, $location, BoardsFactory) {
  $scope.message = 'Boards be here!';

  $scope.open = () => {
    let modalInstance = $uibModal.open({
      templateUrl: '../partials/ModalView.html',
      controller: 'ModalCtrl'
    });
  };

  $scope.viewBoard = (boardId)=>{
    $location.path(`/boards/${boardId}`);
  };

  $scope.boardDelete = (boardId)=> {
    BoardsFactory.deleteBoard(boardId)
    .then(()=> console.log('board deleted:', boardId));
  };

  $scope.boards = boards;

});
