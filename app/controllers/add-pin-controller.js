'use strict';

pinHead.controller('AddPinController', function ($scope, $window, UserFactory, PinFactory) {

    PinFactory.getBoards(UserFactory.getUser())
    .then((data)=>{
        console.log("data", data);
        $scope.boards = data;
        console.log("boards", $scope.boards);
    });

    $scope.pin = {
        imgUrl: "",
        board_id: "",
        title: ""
    };

    $scope.addNewPin = ()=>{
        console.log("click called");
        PinFactory.postNewPin($scope.pin)
        .then((data)=>{
            console.log("new pin data", data);
            $window.location.href = `#!/board/${$scope.pin.board_id}`;
        });
    };

});