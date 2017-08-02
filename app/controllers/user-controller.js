'use strict';

pinHead.controller('UserController', function($scope, $window, UserFactory) {
    $scope.login = () => {
        UserFactory.loginUser()
        .then( (data) => {
            let currentUser = data.user.uid;
            console.log("user data", data);
            console.log("currentUser", currentUser);
            $window.location.href = '#!/board/all';
        });
    };
});