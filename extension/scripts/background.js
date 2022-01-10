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

chrome.browserAction.onClicked.addListener(function(activeTab){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            window.open("https://www.hackersmansion.me", "_blank");
        }
        else {
            //User is signed out
        }
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if(message == "+"){
        
    }
});