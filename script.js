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

firebase.database().ref("GKCscoreboard/").on("value", function(GKCscoreboard_object){
    if(GKCscoreboard_object.exists()){
        const keys = Object.keys(GKCscoreboard_object.val());
        let users = [];
        keys.map(key => {
            users.push({...eval(`GKCscoreboard_object.val().${key}`)});
        })
        users.sort(({GKC:a}, {GKC:b}) => b-a);
        console.log(users);
    }
});