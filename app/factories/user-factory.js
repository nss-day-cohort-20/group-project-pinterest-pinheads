'use strict';

pinHead.factory('UserFactory', function($q, $http, FirebaseUrl, FBCreds) {

    // https://pinheads-1f7c1.firebaseapp.com/__/auth/handler
    var config = {
        apiKey: FBCreds.apiKey,
        authDomain: FBCreds.authDomain
    };

    firebase.initializeApp(config);
    var provider = new firebase.auth.GoogleAuthProvider();

    let currentUser = null;

    let isAuthenticated = () => {
        return $q( (resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                if(user) {
                    currentUser = user.uid;
                    console.log("currentUser", currentUser );
                    // return currentUser;
                    resolve(true);
                }
                else { //on logout we need to set it back to null.
                    currentUser = null;
                    resolve(false);
                }
            });
        });
    };

    let loginUser = () => {
        return firebase.auth().signInWithPopup( provider);
    };

    let getUser = () => {
        console.log("currentUser", currentUser);
        return currentUser;
    };

return {loginUser, isAuthenticated, getUser};
});
