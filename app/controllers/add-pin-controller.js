'use strict';

pinHead.controller('AddPinController', function($scope, $window, UserFactory, PinFactory) {

    PinFactory.getBoards(UserFactory.getUser())
        .then((data) => {
            console.log("data", data);
            $scope.boards = data;
            console.log("boards", $scope.boards);
        });

    $scope.pin = {
        url: "",
        board_id: "",
        title: ""
    };

    $scope.addNewPin = () => {
        console.log("click called");
        if ($scope.pin.board_id != "") {

            PinFactory.postNewPin($scope.pin)
                .then((data) => {
                    console.log("new pin data", data);
                    $window.location.href = `#!/board/${$scope.pin.board_id}`;
                });

        } else {
            alert("You must select a board!");
            console.log("user tried to create a pin to an empty board.");
        }
    };

});