const firebaseConfig = {
    apiKey: "AIzaSyCXdrKIcUDeXION2j3kKC4mpmUt5A6gs-s",
    authDomain: "gkc-clicker.firebaseapp.com",
    databaseURL: "https://gkc-clicker-default-rtdb.firebaseio.com",
    projectId: "gkc-clicker",
    storageBucket: "gkc-clicker.appspot.com",
    messagingSenderId: "963494445348",
    appId: "1:963494445348:web:19326553cd7783a46973b1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log("User is signed in!")
    }
    else {
        //User is signed out
        signIn();
    }
});

//Set provider
var provider = new firebase.auth.GoogleAuthProvider();

//Signin function
function signIn(){
    firebase.auth().signInWithRedirect(provider);
    firebase.auth()
    .getRedirectResult()
    .then((result) => {
        if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // ...
        }
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}