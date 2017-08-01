"use strict";

let pinHead = angular.module("PinHead", ["ngRoute"])
.constant('FirebaseUrl', 'https://pinheads-1f7c1.firebaseio.com/');

pinHead.config(($routeProvider)=>{
    $routeProvider
    .when('/', {
        templateUrl: 'templates/login.html',
        controller: 'UserController'
    })
    .when('/board/all', {
        templateUrl: 'templates/boards-all.html',
        controller: 'AllBoardsController'
    })
    .when('/board/:board_id', {
        templateUrl : 'templates/single-board.html',
        controller: 'SingleBoardController'
    })
    .when('/pin/add', {
        templateUrl: 'templates/pin-form.html',
        controller: 'AddPinController'
    })

    .when('/pin/view/:pin_id', {
        templateUrl: 'templates/single-pin.html',
        controller: 'SinglePinController'
    })
    .when('/pin/edit/:pin_id', {
        templateUrl: 'templates/pin-form.html',
        contrller: 'EditPinController'
    })
    .otherwise('/');
});

