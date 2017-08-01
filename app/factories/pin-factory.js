'use strict';

pinHead.factory("PinFactory", function($q, $http, FirebaseUrl) {
	
	//this needs to be called after the user is authenticated - on login automatically, and if called again pass in curren user's uid
	let getBoards = (uid) => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}boards.json?orderBy="uid"&equalTo="${uid}"`)
			.then( (boardsData) => {
				resolve(boardsData.data);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

	let getPins = (uid) => {
		return $q( (resolve, reject) => {
			//we can only fetch based on one parameter (like UID), but we only really need the pins for one board at a time. Fetch all, then filter within the controller?
			$http.get(`${FirebaseUrl}pins.json?orderBy="uid"&equalTo="${uid}"`)
			.then( (pinsData) => {
				resolve(pinsData.data);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};


	return { getBoards, getPins };
});