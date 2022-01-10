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

chrome.identity.getProfileUserInfo(function(userInfo) {
    let username = userInfo.email.split("@").shift();
    let email = userInfo.email;
    let userid = userInfo.id;
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

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if(message == "+"){
            firebase.database().ref("GKCscoreboard/" + username).get().then(function(GKCscoreboard_object){
                const GKC = GKCscoreboard_object.val().GKC
                firebase.database().ref("GKCscoreboard/" + username).update({
                    GKC: 1 + GKC
                });
            });
            sendResponse("Added 1 GKC!");
        }
    });
});


chrome.browserAction.onClicked.addListener(function(activeTab){
    window.open("https://codezhifty.github.io/GKCclicker/", "_blank")
});