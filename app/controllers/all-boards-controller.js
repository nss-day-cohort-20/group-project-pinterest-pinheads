'use strict';

pinHead.controller('AllBoardsController', function ($scope, $window, UserFactory, PinFactory, $q) {

	let currentUser = null;
	$scope.pinLimit = 9;
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

		console.log("boarddata?", boards);
		Object.keys(boardData).forEach( (key) => {
			boardData[key].id = key;
			boardsArr.push(boardData[key]);
		});
		// console.log("boards Array", boardsArr);
		boardsArr.forEach((board)=>{
			PinFactory.getPins(board.id)
			.then((values)=>{
				board.pins = values;
			// let allPinsArr = [];
			// console.log("values",values );
			// 	let pinsArr = [];
			// 	// console.log("board", board);
			// 	for(let keys in values)
			// 	{
			// 		pinsArr.push(values[keys].url);
			// 	}
			// 		$scope.boards.allPins = pinsArr;
			// 		console.log("pinsArr", $scope.boards);

			});


			// console.log("allPins", $scope.allPins);
	});
		$scope.boards = boardsArr;
		console.log("$scope.boards", $scope.boards);
	// .catch( (err) => {
	// 	console.log("error", err);
	// });
			// console.log("promiseCall", promiseCall);
			// promisesArr.push(promiseCall);
			// console.log("promisesArr", promisesArr);
		});
		// $q.all(promisesArr)
		
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