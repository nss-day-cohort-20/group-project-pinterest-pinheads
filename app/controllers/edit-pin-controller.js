'use strict';

pinHead.controller('EditPinController', function ($scope, $window, $routeParams, UserFactory, PinFactory) {

	$scope.PageTitle = "Edit Your Pin";
  //get single pin, use that object to populate the form with data binding

	//gotta get the boards before you can display!
	PinFactory.getBoards(UserFactory.getUser())
    .then( (data) => {
        $scope.boards = data;
    });

	let pinId = $routeParams.pin_id;


	PinFactory.getSinglePin(pinId)
	.then( (onePin) => {
		$scope.pin = onePin;
	});


	$scope.savePin = () => {
		console.log("save edited pin called", $scope.pin, pinId);
		PinFactory.updatePinOnFB($scope.pin, pinId)
		.then( (data) => {
			console.log("editedpindata", data);
			$window.location.href=`#!/board/${$scope.pin.board_id}`;
		});
	};

});