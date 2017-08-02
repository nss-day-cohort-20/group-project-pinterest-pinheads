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

  PinFactory.getSingleBoard( $routeParams.board_id )
  .then( (boardData) => {
  	console.log("single board data", boardData);
  	$scope.board = boardData;
  });

  $scope.deleteBoard = function() {
  	PinFactory.deleteBoardFromFB( $scope.board.id )
  	.then( (data) => {
  		console.log("deleted", data);
  		$window.location.href="#!/board/all";
  	});
  };


});