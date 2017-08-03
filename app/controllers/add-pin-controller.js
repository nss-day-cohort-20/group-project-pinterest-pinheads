'use strict';

pinHead.controller('AddPinController', function($scope, $window, $routeParams, UserFactory, PinFactory) {

    $scope.PageTitle =  "Create A Pin";
    let defaultBoard = $routeParams.board_id;

    let goGetBoards = function() {
    PinFactory.getBoards(UserFactory.getUser())
        .then((data) => {
            $scope.boards = data;
        });
    };

    goGetBoards();

    $scope.pin = {
        url: "",
        board_id: defaultBoard,
        title: ""
    };

    $scope.newBoard = {
        title: "",
    };

    $scope.addBoard = () => {
        $scope.newBoard.uid = UserFactory.getUser();
        PinFactory.postNewBoard($scope.newBoard)
        .then( (response) => {
            let newBoardId = response.data.name;
            $window.location.href=`#!/pin/add/${newBoardId}`;
        });
    };

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