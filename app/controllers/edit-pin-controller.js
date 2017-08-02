'use strict';

pinHead.controller('EditPinController', function ($scope, $window, $routeParams, UserFactory, PinFactory) {
	$scope.pin=null;
	$scope.PageTitle = "Edit Your Pin";

	//get the boards before you can display!
	PinFactory.getBoards(UserFactory.getUser())
    .then( (data) => {
        console.log("data", data);
        $scope.boards = data;
        console.log("boards", $scope.boards);
    });

	let pinId = $routeParams.pin_id;

	console.log("what to edit?", pinId);

	PinFactory.getSinglePin(pinId)
	.then( (onePin) => {
		console.log("onePin to rule them", onePin);
		$scope.pin = onePin;
		console.log("same?", $scope.pin);
	});


	$scope.savePin = () => {
		console.log("save edited pin called", $scope.pin, pinId);
		PinFactory.updatePinOnFB($scope.pin, pinId)
		.then( (data) => {
			console.log("editedpindata", data);
			$window.location.href=`#!/board/${$scope.pin.board_id}`;
		});
	};
  //get single pin, use that object to populate the form with data binding

});