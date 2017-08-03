'use strict';

pinHead.controller('NavController', function ($scope, $window, UserFactory, PinFactory) {

    $scope.logout = () => {
        UserFactory.logoutUser()
        .then( (data) => {
            $window.location.href = "#!/";
            alert('successfully logged out');
        });
    };

});