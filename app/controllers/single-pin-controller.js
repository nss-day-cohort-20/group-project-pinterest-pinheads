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
		PinFactory.deletePinFromFB(pinId);
		//go back to single board view
		$window.location.href=`#!/board/${boardId}`;
	};

	$scope.editPin = () => {
		$window.location.href=`#!/pin/edit/${pinId}`;
	};



});