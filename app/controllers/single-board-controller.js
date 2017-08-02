'use strict';

pinHead.controller('SingleBoardController', function ($scope, $window, $routeParams, UserFactory, PinFactory) {

  PinFactory.getPins( $routeParams.board_id )
  .then( (pinData) => {
	let pinsArr = [];
	Object.keys(pinData).forEach( (key) => {
		pinData[key].id= key;
		pinsArr.push(pinData[key]);
	});
	$scope.pins = pinsArr;
  })
  .catch( (err) => {
    console.log('error?', err);
  });


});