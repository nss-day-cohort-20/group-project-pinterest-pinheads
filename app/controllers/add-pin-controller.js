'use strict';

pinHead.controller('AddPinController', function($scope, $window, UserFactory, PinFactory) {

    $scope.PageTitle = "Create A Pin";

    PinFactory.getBoards(UserFactory.getUser())
        .then((data) => {
            $scope.boards = data;
        });

    $scope.pin = {
        url: "",
        board_id: "",
        title: ""
    };

    $scope.pin.board_id=$scope.selected;

    $scope.savePin = ()=>{
        if ($scope.pin.board_id !== "") {

            PinFactory.postNewPin($scope.pin)
                .then((data) => {
                    $window.location.href = `#!/board/${$scope.pin.board_id}`;
                });

        } else {
            alert("You must select a board!");
            // console.log("user tried to create a pin to an empty board.");
        }
    };

});