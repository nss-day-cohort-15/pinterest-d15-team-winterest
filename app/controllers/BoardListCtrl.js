'use strict';

app.controller('BoardListCtrl', function($scope, $uibModal, boards, $location) {
  $scope.message = 'Boards be here!';

  $scope.open = () => {
    let modalInstance = $uibModal.open({
      templateUrl: '../partials/ModalView.html',
      controller: 'ModalCtrl'
    });
  };

  $scope.viewBoard = (boardId)=>{
    $location.path(`/boards/${boardId}`)
  };

  $scope.boards = boards;

});
