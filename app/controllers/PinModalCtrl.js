'use strict';

app.controller('PinModalCtrl', function($scope, $uibModalInstance, PinsFactory, $route, $routeParams) {
  $scope.pin = {
    title: '',
    description: '',
    imgUrl: '',
    boardId: $routeParams.boardId
  };

  $scope.create = () => {
    console.log("boardId", $routeParams.boardId);
    PinsFactory.createPin($scope.pin)
    .then(()=>{
      $scope.pin = {};
      $uibModalInstance.close();
      return PinsFactory.getPins($routeParams.boardId);
    })
    .then((pins)=>{
      console.log("pins", pins);
      $route.reload();
    });
  };

  $scope.close = () => {
    $uibModalInstance.close();
    $scope.pin = {};
  };
});
