'use strict';


pinHead.factory("PinFactory", function($q, $http, FirebaseUrl) {
	
	//this needs to be called after the user is authenticated - on login automatically, and if called again pass in curren user's uid
	let getBoards = (uid) => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}boards.json?orderBy="uid"&equalTo="${uid}"`)
			.then( (boardsData) => {
				resolve(boardsData);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

	// let getPins = ()


	return { getBoards };
});
