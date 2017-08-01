'use strict';

pinHead.controller('AddPinController', function ($scope, $window, UserFactory, PinFactory) {

    $scope.boards = PinFactory.getBoards();

    $scope.pin = {
        imgUrl: "",
        board_id: "",
        title: ""
    };

    $scope.addNewPin = ()=>{
        PinFactory.postNewPin($scope.pin)
        .then((data)=>{
            console.log("new pin data", data);
            $window.location.href = `#!/board/${$scope.pin.board_id}`;
        });
    };

});