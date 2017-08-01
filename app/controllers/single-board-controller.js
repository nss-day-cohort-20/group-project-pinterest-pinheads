'use strict';

pinHead.controller('SingleBoardController', function ($scope, $window, $routeParams, UserFactory, PinFactory) {

  PinFactory.getBoards(currentUser)
  .then ( (boardData) => {
    console.log('boardData', boardData);
    $scope.board = boardData;
  });

});