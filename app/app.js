"use strict";

let pinHead = angular.module("PinHead", ["ngRoute"])
.constant('FirebaseUrl', 'https://pinheads-1f7c1.firebaseio.com/');

let isAuth = (UserFactory) => {
    return new Promise( (resolve, reject) => {
        UserFactory.isAuthenticated()
        .then( (userExistence) => {
            if (userExistence) {
                resolve();
            } else {
                reject();
            }
        });
    });
};

pinHead.config(($routeProvider)=>{
    $routeProvider
    .when('/', {
        templateUrl: 'templates/login.html',
        controller: 'UserController'
    })
    .when('/board/all', {
        templateUrl: 'templates/boards-all.html',
        controller: 'AllBoardsController',
        resolve: {isAuth}
    })
    .when('/board/:board_id', {
        templateUrl : 'templates/single-board.html',
        controller: 'SingleBoardController',
        resolve: {isAuth}
    })
    .when('/pin/add', {
        templateUrl: 'templates/pin-form.html',
        controller: 'AddPinController',
        resolve: {isAuth}
    })

    .when('/pin/view/:pin_id', {
        templateUrl: 'templates/single-pin.html',
        controller: 'SinglePinController',
        resolve: {isAuth}
    })
    .when('/pin/edit/:pin_id', {
        templateUrl: 'templates/pin-form.html',
        controller: 'EditPinController',
        resolve: {isAuth}
    })
    .otherwise('/');
});

