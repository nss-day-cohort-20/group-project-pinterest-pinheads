'use strict';

pinHead.controller('AllBoardsController', function ($scope, $window, UserFactory, PinFactory) {

	let currentUser = null;

	$scope.newBoard = {
		title: "",
	};

	UserFactory.isAuthenticated()
	.then( (user) => {
		currentUser = UserFactory.getUser();
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
			$scope.boards = boardsArr;
		})
		.catch( (err) => {
			console.log("error", err);
		});
	}

	$scope.addBoard = () => {
		$scope.newBoard.uid = currentUser;
		PinFactory.postNewBoard($scope.newBoard)
		.then( (response) => {
			goGetBoards();
			$scope.newBoard.title = "";
			// $window.location.href = "#!/board/all";
		});
	};

});