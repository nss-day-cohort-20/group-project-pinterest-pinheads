'use strict';

pinHead.controller('SinglePinController', function ($scope, $window, $routeParams, UserFactory, PinFactory) {

	let pinId = $routeParams.pin_id;
	let boardId=null;

	PinFactory.getSinglePin(pinId)
	.then( (onePin) => {
		$scope.singlePin = onePin;
		boardId = onePin.board_id;
	});

	$scope.delete = () => {
		if ($window.confirm("Are you sure you want to delete?")) {
			PinFactory.deletePinFromFB(pinId)
			.then( (response) => {
				//go back to single board view
				$window.location.href=`#!/board/${boardId}`;
				$window.location.reload(true);
				
			});
		}
	};

	$scope.editPin = () => {
		$window.location.href=`#!/pin/edit/${pinId}`;
	};



});