"use strict";
app.factory("ModalFactory", function(){

let showModal = function($modal) {

    $scope.opts = {
    backdrop: true,
    backdropClick: true,
    dialogFade: false,
    keyboard: true,
    templateUrl : 'ModalContent.html',
    controller : ModalInstanceCtrl,
    resolve: {} // empty storage
    };


    $scope.opts.resolve.item = function() {
        return angular.copy({name:$scope.name}); // pass name to Dialog
    }

      var modalInstance = $modal.open($scope.opts);

      modalInstance.result.then(function(){
        //on ok button press
      },function(){
        //on cancel button press
        console.log("Modal Closed");
      });
  };

  return {showModal};

});