let displayName;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        displayName = user.email.split("@").shift();
    }
});

function pay() {
    const friendInput = document.getElementById("friendInput");
    const payAmount = document.getElementById("payAmount");

    firebase.database().ref("GKCscoreboard/" + friendInput.value).get().then(function(GKCscoreboard_object){
        if(GKCscoreboard_object.exists()){
            const GKC = GKCscoreboard_object.val().GKC
            firebase.database().ref("GKCscoreboard/" + friendInput.value).update({
                GKC: GKC + parseInt(payAmount.value)
            });
            firebase.database().ref("GKCscoreboard/" + displayName).get().then(function(GKCscoreboard_object){
                const GKC2 = GKCscoreboard_object.val().GKC
                firebase.database().ref("GKCscoreboard/" + displayName).update({
                    GKC: GKC2 - parseInt(payAmount.value)
                });
            });
        } else {
            invalidPersonAlert();
        }
    });
}

function invalidPersonAlert() {
    if(document.getElementById("invalidPersonAlert")){
        document.getElementById("invalidPersonAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-warning alert-dismissible fade show";
    alert.id = "invalidPersonAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>Error!</strong> That person doesn't exist! <button type="button" class="btn-close" onclick="document.getElementById('invalidPersonAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}