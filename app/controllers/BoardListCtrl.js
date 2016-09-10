'use strict';

app.controller('BoardListCtrl', function($scope, $uibModal, boards, $location, $q, BoardsFactory, PinsFactory) {
  $scope.boards = boards;

  $scope.boardEdit= (board)=>{
    let modalInstance = $uibModal.open({
      templateUrl: '../partials/ModalView.html',
      controller: 'ModalCtrl',
      resolve: {
        board,
        isEditing: true
      }
    });
  };

  $scope.open = () => {
    let modalInstance = $uibModal.open({
      templateUrl: '../partials/ModalView.html',
      controller: 'ModalCtrl',
      resolve: {
        board: {
          title: "",
          description: ""
        },
        isEditing: false
      }
    });
  };

  $scope.viewBoard = (boardId)=>{
    $location.path(`/boards/${boardId}`);
  };

  $scope.boardDelete = (boardId)=> {
    BoardsFactory.deleteBoard(boardId)
    .then(() => {
      console.log('board deleted:', boardId);
      console.info('Repainting DOM with boards.');
      return BoardsFactory.getBoards();
    })
    .then((boards) => {
      $scope.boards = boards;
    });
  };
});
