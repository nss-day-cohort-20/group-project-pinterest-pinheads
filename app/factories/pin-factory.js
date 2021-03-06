'use strict';

pinHead.factory("PinFactory", function($q, $http, FirebaseUrl) {

	//this needs to be called after the user is authenticated - on login automatically, and if called again pass in curren user's uid
	let getBoards = (user) => {
		return $q( (resolve, reject) => {
			//may need to put "" around the "user" variable because it needs to be a string, not a number.
			$http.get(`${FirebaseUrl}boards.json?orderBy="uid"&equalTo="${user}"`)
			.then( (boardsData) => {
				for(let key in boardsData.data){
					boardsData.data[key].id = key;
				}
				resolve(boardsData.data);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

	let getSingleBoard = (boardId) => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}boards/${boardId}.json`)
			.then( (board) => {
				board.data.id = boardId;
				resolve(board.data);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

	let getPins = (board_id) => {
		return $q( (resolve, reject) => {
			//the board ID will be part of the URL and we have to get it using the routeParams thing
			//this will be for SingleBoardController - single board view
			$http.get(`${FirebaseUrl}pins.json?orderBy="board_id"&equalTo="${board_id}"`)
			.then( (pinsData) => {
				resolve(pinsData.data);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

//do we need this for single pin view?
	let getSinglePin = (pinId) => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}pins/${pinId}.json`)
			.then( (item) => {
				resolve(item.data);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

	// needs to take in the info from the form and controller for NEW item
	//make sure the newObj passed in has a property of the current user's uid
	let postNewPin = (newObj) => {
		return $q( (resolve, reject) => {
			$http.post(`${FirebaseUrl}pins.json`,
				angular.toJson(newObj))
			.then( (response) => {
				resolve(response);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

//board Obj should include the uid as well as the title of the new board
	let postNewBoard = (boardObj) => {
		return $q( (resolve, reject) => {
			$http.post(`${FirebaseUrl}boards.json`,
				angular.toJson(boardObj))
			.then( (response) => {
				console.log('response', response);
				resolve(response);
			})
			.catch( (err) => {
				reject(err);
			});

		});
	};

	let deleteBoardFromFB = (boardId) => {
		return $q( (resolve, reject) => {
			if (boardId) {
					$http.delete(`${FirebaseUrl}boards/${boardId}.json`)
					.then( (data) => {
						resolve(data);
					})
					.catch( (err) => {
						reject(err);
					});
			} else {
				console.log("There was a mistake trying to delete board!");
			}
		});
	};


//requires pinID (fb key) from path/data attribute
	let deletePinFromFB = (pinId) => {
		return $q( (resolve, reject) => {
			if (pinId) {
				$http.delete(`${FirebaseUrl}pins/${pinId}.json`)
				.then( (data) => {
					resolve(data);
				})
				.catch( (err) => {
						reject(err);
					});
			} else {
				console.log("There was a mistake trying to delete pin!");
			}
		});
	};


	let updatePinOnFB = (pinObject, pinId) => {
		return $q( (resolve, reject) => {
			if (pinId) {
				$http.put(`${FirebaseUrl}pins/${pinId}.json`,
					angular.toJson(pinObject))
				.then( (data) => {
					resolve(data);
				})
				.catch( (err) => {
						reject(err);
				});
			} else {
				console.log("There was a mistake trying to update this!");
			}
		});
	};

	let updateBoardOnFB = (boardObj, boardId) => {
		return $q( (resolve, reject) => {
			if (boardId) {
				$http.put(`${FirebaseUrl}boards/${boardId}.json`,
					angular.toJson(boardObj))
				.then( (data) => {
					resolve(data);
				})
				.catch( (err) => {
						reject(err);
					});
			} else {
				console.log("There was a mistake trying to update this!");
			}
		});
	};

	return { getBoards, getPins, postNewPin, postNewBoard, deletePinFromFB, deleteBoardFromFB, getSinglePin, updatePinOnFB, getSingleBoard, updateBoardOnFB };
});

