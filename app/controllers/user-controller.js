'use strict';

pinHead.controller('UserController', function($scope, $window, UserFactory) {
    $scope.login = () => {
        UserFactory.loginUser()
        .then( (data) => {
            let currentUser = data.user.uid;
            $window.location.href = '#!/board/all';
            console.log("currentUser", currentUser);
        });
    };
});