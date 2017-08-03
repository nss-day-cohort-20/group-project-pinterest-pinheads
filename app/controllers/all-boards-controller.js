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
				let usablePins = [];
				for(let pin in values) {
					usablePins.push(values[pin]);
				}
				// console.log("values????", values);
				board.pins = usablePins;
			});
	});
		$scope.boards = boardsArr;
		console.log("$scope.boards", $scope.boards);
		});		
}

$scope.addBoard = () => {
	$scope.newBoard.uid = currentUser;
	PinFactory.postNewBoard($scope.newBoard)
	.then( (response) => {
		goGetBoards();
		$scope.newBoard.title = "";
	});
};
});