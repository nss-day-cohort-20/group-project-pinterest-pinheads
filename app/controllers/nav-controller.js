'use strict';

pinHead.controller('NavController', function ($scope, $window, UserFactory, PinFactory) {

    $scope.logout = () => {
        UserFactory.logoutUser()
        .then( (data) => {
            console.log("data", data);
            $window.location.href = "#!/";
            alert('successfully logged out');
        });
    };
    // console.log("ToggleLinkFactory.noBoard", ToggleLinkFactory.noBoard );
        // $scope.noBoard = ToggleLinkFactory;

UserFactory.isAuthenticated()
    .then( (user) => {
        let currentUser = UserFactory.getUser();
        console.log("current user???", currentUser);
       
        PinFactory.getBoards(currentUser)
        .then( (boards) => {
            if(Object.keys(boards).length === 0 && boards.constructor === Object)
            {
                // console.log("ToggleLinkFactory",ToggleLinkFactory );
                $scope.noBoard = true;
            }
            else
            {
                $scope.noBoard = false;
            }
            console.log("noBoard???", $scope.noBoard );
        });
            console.log("noBoard-secondtime?", $scope.noBoard );
    });

});