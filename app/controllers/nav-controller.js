'use strict';

pinHead.controller('NavController', function ($scope, $window, UserFactory, PinFactory) {

    $scope.logout = () => {
        UserFactory.logoutUser()
        .then( (data) => {
            console.log("data", data);
            $window.location.href = "#!/";
            $window.location.reload(true);
            alert('successfully logged out');
        });
    };
    // console.log("ToggleLinkFactory.noBoard", ToggleLinkFactory.noBoard );
        // $scope.noBoard = ToggleLinkFactory;

    UserFactory.isAuthenticated()
    .then( (user) => {
        if(user)
            $scope.isUser = true;
        else
            $scope.isUser = false;
    });

});