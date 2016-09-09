'use strict';

app.controller('BoardListCtrl', function($scope, $uibModal, boards, $location, $q, BoardsFactory, PinsFactory) {
  $scope.message = 'Boards be here!';

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

  $scope.boards = boards;
  console.log(boards);

  $scope.coverImages = [];

  let getImgUrlsFromBoard = (board) => {
    return PinsFactory.getPins(board.id)
      .then((pinsArray) => {
        let imgUrlsArr = [];
        pinsArray.forEach((pin, index) => {
          if (index < 4) {
            imgUrlsArr.push(pin.imgUrl);
          }
        });
        $scope.coverImages.push(imgUrlsArr);
        console.log($scope.coverImages);
      });
  };

  let getPinImagesFromBoards = () => {
    boards.map((board) => {
      getImgUrlsFromBoard(board);
    });
  };

  getPinImagesFromBoards();
});
