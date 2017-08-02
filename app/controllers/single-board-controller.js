'use strict';

pinHead.controller('SingleBoardController', function ($scope, $window, $routeParams, UserFactory, PinFactory) {

  PinFactory.getPins( $routeParams.board_id )
  .then( (pinData) => {
    // console.log('pinData', pinData);
    $scope.pins = pinData;
  })
  .catch( (err) => {
    console.log('error?', err);
  });

});