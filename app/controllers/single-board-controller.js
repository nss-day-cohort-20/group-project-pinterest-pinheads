'use strict';

pinHead.controller('SingleBoardController', function ($scope, $window, $routeParams, UserFactory, PinFactory) {

  PinFactory.getPins( $routeParams.board_id )
  .then( (pinData) => {
    console.log('pinData', pinData);
    let pinArr = [];
    Object.keys(pinData).forEach( (key) => {
      pinData[key].id = key;
      pinArr.push(pinData[key]);
    });
    $scope.pins = pinArr;
  })
  .catch( (err) => {
    console.log('error?', err);
  });

});