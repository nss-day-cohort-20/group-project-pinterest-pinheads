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
    if ($window.confirm("Are you sure you want to delete?")) {
    	PinFactory.deleteBoardFromFB( $scope.board.id )
    	.then( (data) => {
    		$window.location.href="#!/board/all";
    	});
    }
  };
  $scope.updateBoard = function() {
  	console.log("scope dot board", $scope.board);
  	PinFactory.updateBoardOnFB($scope.board, $scope.board.id)
  	.then( (data) => {
  		console.log("a board was updated");
  	});
  };

  $scope.deletePin = function(pinId) {
    if ($window.confirm("Are you sure you want to delete?")) {
      console.log('deletePin', pinId);
      PinFactory.deletePinFromFB(pinId)
      .then( (response) => {
        console.log('response', response);
        $window.location.reload(true);
      });
    }
  };

});

