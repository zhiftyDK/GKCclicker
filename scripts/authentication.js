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

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        loadUserMenu(user.displayName, user.photoURL, user.email);
        if(user.email.split("@").shift().replace(/./g, "").replace(/#/g, "").replace(/$/g, "").charAt(0) == /[0-9]/g){
            var username = "user_" + user.email.split("@").shift();
        } else {
            var username = user.email.split("@").shift().replace(/./g, "").replace(/#/g, "").replace(/$/g, "");
        }
        let email = user.email;
        let userid = user.uid;
        firebase.database().ref("GKCscoreboard/" + username).on("value", function(GKCscoreboard_object){
            if(!GKCscoreboard_object.exists()){
                firebase.database().ref("GKCscoreboard/" + username).set({
                    email: email,
                    userid: userid,
                    GKC: 0
                }, (error) => {
                    if (error) {
                    // The write failed...
                    alert("Couldnt authenticate you, you need to sign into your browser!");
                    }
                });
            }
        });
    }
    else {
        //User is signed out
        document.getElementById("googleSigninButton").style.display = "block";
    }
});

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
        loadUserMenu(user.displayName, user.photoURL, user.email);
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        document.getElementById("googleSigninButton").style.display = "block";
    });
}

function loadUserMenu(displayName, photoURL){
    document.getElementById("userMenuName").innerHTML = displayName;
    document.getElementById("userMenuPhoto").src = photoURL;
    document.getElementById("googleSigninButton").style.display = "none";
    document.getElementById("userMenu").style.display = "block";
    
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        applicationName = user.email.split("@").shift();
        firebase.database().ref("GKCscoreboard/" + applicationName).on("value", function(GKCscoreboard_object){
            if(GKCscoreboard_object.exists()){
                const GKC = GKCscoreboard_object.val().GKC;
                document.getElementById("GKCamount").innerHTML = `${GKC} <i class="fas fa-coins"></i>`;
                document.getElementById("currentGKC").style.display = "block";
            }
        });
    }
});


function signOut(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "./index.html";
    }).catch((error) => {
        // An error happened.
    });
}