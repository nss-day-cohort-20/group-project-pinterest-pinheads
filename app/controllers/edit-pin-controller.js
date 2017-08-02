'use strict';

pinHead.controller('EditPinController', function ($scope, $window, $routeParams, UserFactory, PinFactory) {

	$scope.PageTitle = "Edit Your Pin";

	let pinId = $routeParams.pin_id;

	console.log("what to edit?", pinId);

	PinFactory.getSinglePin(pinId)
	.then( (onePin) => {
		console.log("onePin to rule them", onePin);
		$scope.pin = onePin;
	});

	$scope.savePin = () => {
		console.log("save edited pin called");
		PinFactory.updatePin($scope.pin)
		.then( (data) => {
			console.log("editedpindata", data);
			$window.location.href=`#!/board/${$scope.pin.board_id}`;
		});
	};
  //get single pin, use that object to populate the form with data binding

});