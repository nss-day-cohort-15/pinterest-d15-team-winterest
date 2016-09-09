'use strict';

app.controller('BoardSingleCtrl', function($scope, $routeParams, BoardsFactory, PinsFactory, $uibModal, $route) {
  $scope.message = 'Single board pins be here!';

  let boardId = $routeParams.boardId;

  BoardsFactory.getSingleBoard(boardId)
  .then((singleBoard) => {
    console.log(singleBoard);
    $scope.board = singleBoard;
    return PinsFactory.getPins($routeParams.boardId)
  })
  .then ((pins) => {
    $scope.pins = pins;
  })

  $scope.open = (boardId) => {
     let modalInstance = $uibModal.open({
      templateUrl: '../partials/PinsModal.html',
      controller: 'PinModalCtrl',
      resolve: {
        boardId
      }
    });
  };

});
