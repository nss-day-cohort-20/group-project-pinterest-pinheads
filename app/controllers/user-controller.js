'use strict';

pinHead.controller('UserController', function($scope, $window, UserFactory) {
    $scope.login = () => {
        UserFactory.loginUser()
        .then( (data) => {
            $window.location.href = '#!/board/all';
        });
    };
});