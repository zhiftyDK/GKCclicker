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

//Set provider
var provider = new firebase.auth.GoogleAuthProvider();

//Check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            if(message == "+"){
                
            }
        });
    }
    else {
        //User is signed out
        window.open("https://codezhifty.github.io/GKCclicker/", "_blank");
    }
});

chrome.browserAction.onClicked.addListener(function(activeTab){
    window.open("https://codezhifty.github.io/GKCclicker/", "_blank");
});