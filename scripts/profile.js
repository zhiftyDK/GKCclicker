firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        document.getElementById("profilePhoto").src = user.photoURL;
        document.getElementById("profileName").value = user.displayName;
        if(user.email.split("@").shift().replace(/\./g,'').replace(/#/g, "").replace(/\$/g, "").replace(/[\[\]']+/g,'').charAt(0) == /[0-9]/g){
            document.getElementById("profileAppName").value = "user_" + user.email.split("@").shift().replace(/\./g,'').replace(/#/g, "").replace(/\$/g, "").replace(/[\[\]']+/g,'');
        } else {
            document.getElementById("profileAppName").value = user.email.split("@").shift().replace(/\./g,'').replace(/#/g, "").replace(/\$/g, "").replace(/[\[\]']+/g,'');
        }
        document.getElementById("profileEmail").value = user.email;
    }
    else {
        //User is signed out
        window.location.href = "../index.html";
    }
});