'use strict';

pinHead.controller('SingleBoardController', function ($scope, $window, $routeParams, UserFactory, PinFactory) {

  // PinFactory.getBoards( UserFactory.getUser() )
  // .then ( (boardData) => {
  //   console.log('boardData', boardData);
  //   $scope.board = boardData;
  // });

  PinFactory.getPins( UserFactory.getUser() )
  .then( (pinData) => {
    console.log('pinData', pinData);
  });

});