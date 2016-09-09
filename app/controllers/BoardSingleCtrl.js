'use strict';

app.controller('BoardSingleCtrl', function($scope, $routeParams, BoardsFactory, PinsFactory, $uibModal, $route) {
  $scope.message = 'Single board pins be here!';

  let boardId = $routeParams.boardId;

  $scope.pinUpdate = (pin)=>{
    let modalInstance = $uibModal.open({
      templateUrl: '../partials/PinsModal.html',
      controller: 'PinModalCtrl',
      resolve: {
        pin,
        isEditing: true
      }
    });
  };

  let getBoardPins = ()=> {
    BoardsFactory.getSingleBoard(boardId)
    .then((singleBoard) => {
      console.log(singleBoard);
      $scope.board = singleBoard;
      return PinsFactory.getPins($routeParams.boardId);
    })
    .then ((pins) => {
      $scope.pins = pins;
    });
  };

  $scope.open = () => {
     let modalInstance = $uibModal.open({
      templateUrl: '../partials/PinsModal.html',
      controller: 'PinModalCtrl',
      resolve: {
        pin: {
          title: '',
          description: '',
          imgUrl: '',
          boardId: $routeParams.boardId,
        },
        isEditing: false
      }
    });
  };

  $scope.pinDelete = (pinId)=> {
    PinsFactory.deletePin(pinId)
    .then(()=> {
      getBoardPins();
      console.log('pin delete: ', pinId);
    });
  };

  getBoardPins();
});
