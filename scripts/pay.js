let displayName;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        displayName = user.email.split("@").shift();
    }
});

document.getElementById("friendInput").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("payButton").click();
    }
});

document.getElementById("payAmount").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("payButton").click();
    }
});

function pay() {
    if(!displayName == ""){
        const friendInput = document.getElementById("friendInput");
        const payAmount = document.getElementById("payAmount");
        if(friendInput.value == ""){
            emptyFormAlert("your friends app name");
            return;
        } else if(payAmount.value == ""){
            emptyFormAlert("an amount");
            return;
        }

        firebase.database().ref("GKCscoreboard/" + friendInput.value).get().then(function(GKCscoreboard_object){
            if(GKCscoreboard_object.exists()){
                const GKC = GKCscoreboard_object.val().GKC
                firebase.database().ref("GKCscoreboard/" + friendInput.value).update({
                    GKC: GKC + parseInt(payAmount.value)
                });
                firebase.database().ref("GKCscoreboard/" + displayName).get().then(function(GKCscoreboard_object2){
                    const GKC2 = GKCscoreboard_object2.val().GKC
                    firebase.database().ref("GKCscoreboard/" + displayName).update({
                        GKC: GKC2 - parseInt(payAmount.value)
                    });
                });
                transferSuccessAlert(payAmount.value, friendInput.value);
            } else {
                invalidPersonAlert();
            }
        });
    } else {
        notAuthAlert();
    }
}

function notAuthAlert() {
    if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    } else if(document.getElementById("invalidPersonAlert")){
        document.getElementById("invalidPersonAlert").remove();
    } else if(document.getElementById("transferSuccessAlert")){
        document.getElementById("transferSuccessAlert").remove();
    } else if(document.getElementById("emptyFormAlert")){
        document.getElementById("emptyFormAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-danger alert-dismissible fade show";
    alert.id = "notAuthAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>Error!</strong> You need to sign in to perform this action! <button type="button" class="btn-close" onclick="document.getElementById('notAuthAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}

function invalidPersonAlert() {
    if(document.getElementById("invalidPersonAlert")){
        document.getElementById("invalidPersonAlert").remove();
    } else if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    } else if(document.getElementById("transferSuccessAlert")){
        document.getElementById("transferSuccessAlert").remove();
    } else if(document.getElementById("emptyFormAlert")){
        document.getElementById("emptyFormAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-danger alert-dismissible fade show";
    alert.id = "invalidPersonAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>Error!</strong> That person doesn't exist! <button type="button" class="btn-close" onclick="document.getElementById('invalidPersonAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}

function transferSuccessAlert(amount, user) {
    if(document.getElementById("transferSuccessAlert")){
        document.getElementById("transferSuccessAlert").remove();
    } else if(document.getElementById("invalidPersonAlert")){
        document.getElementById("invalidPersonAlert").remove();
    } else if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    } else if(document.getElementById("emptyFormAlert")){
        document.getElementById("emptyFormAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-success alert-dismissible fade show";
    alert.id = "transferSuccessAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>Success!</strong> ${amount} GKC has been transfered to ${user}! <button type="button" class="btn-close" onclick="document.getElementById('transferSuccessAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}

function emptyFormAlert(text) {
    if(document.getElementById("emptyFormAlert")){
        document.getElementById("emptyFormAlert").remove();
    } else if(document.getElementById("transferSuccessAlert")){
        document.getElementById("transferSuccessAlert").remove();
    } else if(document.getElementById("invalidPersonAlert")){
        document.getElementById("invalidPersonAlert").remove();
    } else if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-danger alert-dismissible fade show";
    alert.id = "emptyFormAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>Error!</strong> You need to specify ${text}! <button type="button" class="btn-close" onclick="document.getElementById('emptyFormAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}