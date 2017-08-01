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

	let getPins = (user) => {
		return $q( (resolve, reject) => {
			console.log("user?", user);
			//we can only fetch based on one parameter (like UID), but we only really need the pins for one board at a time. Fetch all, then filter within the controller? OR, can we filter by board instead of user, since boards are attached to users?
			//this will be for SingleBoardController - single board view
			$http.get(`${FirebaseUrl}pins.json?orderBy="uid"&equalTo=${user}`)
			.then( (pinsData) => {
				console.log("pins data", pinsData.data);
				resolve(pinsData.data);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

//do we need this for single pin view?
	let getSinglePin = (pinId) => {
		console.log("fetching one item!", pinId);
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
				console.log("There was a mistake trying to delete this!");
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
				console.log("There was a mistake trying to delete this!");
			}
		});
	};

// //test:
// getPins('4444');
// getBoards('4444');


//TODO functions for patching or PUTing objects back on FB with updated info

	return { getBoards, getPins, postNewPin, postNewBoard, deletePinFromFB, deleteBoardFromFB, getSinglePin };
});

