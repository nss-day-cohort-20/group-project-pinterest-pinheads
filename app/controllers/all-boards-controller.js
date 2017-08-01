'use strict';

pinHead.controller('AllBoardsController', function ($scope, $window, UserFactory, PinFactory) {

	let currentUser = null;

	$scope.newBoard = {
		title: "",
	};

	UserFactory.isAuthenticated()
	.then( (user) => {
		currentUser = UserFactory.getUser();
		console.log("current user???", currentUser);
		goGetBoards();
	});


function goGetBoards() {
	PinFactory.getBoards(currentUser)
	.then( (boards) => {
		let boardsArr = [];
		let boardData = boards;
		Object.keys(boardData).forEach( (key) => {
			boardData[key].id = key;
			boardsArr.push(boardData[key]);
		});
		console.log("boards Array", boardsArr);
		$scope.boards = boardsArr;
	})
	.catch( (err) => {
		console.log("error", err);
	});
}

$scope.addBoard = () => {
	$scope.newBoard.uid = currentUser;
	console.log("newBoard", $scope.newBoard);
	PinFactory.postNewBoard($scope.newBoard)
	.then( (response) => {
		goGetBoards();
		$scope.newBoard.title = "";
		// $window.location.href = "#!/board/all";
	});
};

});