'use strict';

pinHead.factory("PinFactory", function($q, $http, FirebaseUrl) {
	
	//this needs to be called after the user is authenticated - on login automatically, and if called again pass in curren user's uid
	let getBoards = (user) => {
		return $q( (resolve, reject) => {
			//may need to put "" around the "user" variable because it needs to be a string, not a number. 
			$http.get(`${FirebaseUrl}boards.json?orderBy="uid"&equalTo=${user}`)
			.then( (boardsData) => {
				console.log("board data", boardsData.data);
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
			//we can only fetch based on one parameter (like UID), but we only really need the pins for one board at a time. Fetch all, then filter within the controller
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

	// needs to take in the info from the form and controller for NEW item
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

//test:
getPins('4444');
getBoards('4444');

	return { getBoards, getPins };
});