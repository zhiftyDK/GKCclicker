let displayName;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        if(user.email.split("@").shift().replace(/\./g,'').replace(/#/g, "").replace(/\$/g, "").replace(/[\[\]']+/g,'').charAt(0) == /[0-9]/g){
            displayName = "user_" + user.email.split("@").shift().replace(/\./g,'').replace(/#/g, "").replace(/\$/g, "").replace(/[\[\]']+/g,'');
        } else {
            displayName = user.email.split("@").shift().replace(/\./g,'').replace(/#/g, "").replace(/\$/g, "").replace(/[\[\]']+/g,'');
        }
    }
});

document.getElementById("coinflipAmount").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("coinflipButton").click();
    }
});

function flipCoin() {
    if(!displayName == ""){
        firebase.database().ref("GKCscoreboard/" + displayName).get().then(function(GKCscoreboard_object){
            //Check if you have enough money to coinflip
            const gkcCheck = GKCscoreboard_object.val().GKC
            const amountBetCheck = parseInt(document.getElementById("coinflipAmount").value);
            if(document.getElementById("coinflipAmount").value == "") {
                emptyFormAlert();
                return;
            }
            if(gkcCheck >= amountBetCheck) {
                //If you have enough then flip
                document.getElementById("greenCoinflip").style.display = "none";
                document.getElementById("redCoinflip").style.display = "none";
                document.getElementById("defaultCoinflip").style.display = "none";
                let randomInt = Math.floor(Math.random() * 2);
                if(randomInt == 0) {
                    document.getElementById("coinflipButton").disabled = true;
                    document.getElementById("greenCoinflip").style.display = "block";
                    document.getElementById("greenCoinflip").play();
                    document.getElementById("greenCoinflip").onended = function() {
                        document.getElementById("coinflipButton").disabled = false;
                        const colorBet = document.getElementById("coinflipSelect").value;
                        const amountBet = parseInt(document.getElementById("coinflipAmount").value);
                        if(colorBet == "green") {
                            firebase.database().ref("GKCscoreboard/" + displayName).get().then(function(GKCscoreboard_object){
                                const GKC = GKCscoreboard_object.val().GKC
                                firebase.database().ref("GKCscoreboard/" + displayName).update({
                                    GKC: GKC + amountBet
                                });
                            });
                            winningAlert(amountBet);
                        } else {
                            firebase.database().ref("GKCscoreboard/" + displayName).get().then(function(GKCscoreboard_object){
                                const GKC = GKCscoreboard_object.val().GKC
                                firebase.database().ref("GKCscoreboard/" + displayName).update({
                                    GKC: GKC - amountBet
                                });
                            });
                            losingAlert(amountBet);
                        }
                    }
                }
                else if(randomInt == 1) {
                    document.getElementById("coinflipButton").disabled = true;
                    document.getElementById("redCoinflip").style.display = "block";
                    document.getElementById("redCoinflip").play();
                    document.getElementById("redCoinflip").onended = function() {
                        document.getElementById("coinflipButton").disabled = false;
                        const colorBet = document.getElementById("coinflipSelect").value;
                        const amountBet = parseInt(document.getElementById("coinflipAmount").value);
                        if(colorBet == "red") {
                            firebase.database().ref("GKCscoreboard/" + displayName).get().then(function(GKCscoreboard_object){
                                const GKC = GKCscoreboard_object.val().GKC
                                firebase.database().ref("GKCscoreboard/" + displayName).update({
                                    GKC: GKC + amountBet
                                });
                            });
                            winningAlert(amountBet);
                        } else {
                            firebase.database().ref("GKCscoreboard/" + displayName).get().then(function(GKCscoreboard_object){
                                const GKC = GKCscoreboard_object.val().GKC
                                firebase.database().ref("GKCscoreboard/" + displayName).update({
                                    GKC: GKC - amountBet
                                });
                            });
                            losingAlert(amountBet);
                        }
                    }
                }
            } else {
                notEnoughAlert();
            }
        });
    } else {
        notAuthAlert();
    }
}

function notAuthAlert() {
    if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    }else if(document.getElementById("winningAlert")){
        document.getElementById("winningAlert").remove();
    } else if(document.getElementById("losingAlert")){
        document.getElementById("losingAlert").remove();
    } else if(document.getElementById("notEnoughAlert")){
        document.getElementById("notEnoughAlert").remove();
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

function winningAlert(amountBet) {
    if(document.getElementById("winningAlert")){
        document.getElementById("winningAlert").remove();
    } else if(document.getElementById("losingAlert")){
        document.getElementById("losingAlert").remove();
    } else if(document.getElementById("notEnoughAlert")){
        document.getElementById("notEnoughAlert").remove();
    } else if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    } else if(document.getElementById("emptyFormAlert")){
        document.getElementById("emptyFormAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-success alert-dismissible fade show";
    alert.id = "winningAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>You won!</strong> ${amountBet} GKC is added to your account! <button type="button" class="btn-close" onclick="document.getElementById('winningAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}

function losingAlert(amountBet) {
    if(document.getElementById("losingAlert")){
        document.getElementById("losingAlert").remove();
    } else if(document.getElementById("winningAlert")){
        document.getElementById("winningAlert").remove();
    } else if(document.getElementById("notEnoughAlert")){
        document.getElementById("notEnoughAlert").remove();
    } else if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    } else if(document.getElementById("emptyFormAlert")){
        document.getElementById("emptyFormAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-warning alert-dismissible fade show";
    alert.id = "losingAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>You Lose!</strong> ${amountBet} GKC is removed from your account! <button type="button" class="btn-close" onclick="document.getElementById('losingAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}

function notEnoughAlert() {
    if(document.getElementById("losingAlert")){
        document.getElementById("losingAlert").remove();
    } else if(document.getElementById("winningAlert")){
        document.getElementById("winningAlert").remove();
    } else if(document.getElementById("notEnoughAlert")){
        document.getElementById("notEnoughAlert").remove();
    } else if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    } else if(document.getElementById("emptyFormAlert")){
        document.getElementById("emptyFormAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-danger alert-dismissible fade show";
    alert.id = "notEnoughAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>Error!</strong> You don't have enough money to perform this action! <button type="button" class="btn-close" onclick="document.getElementById('notEnoughAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}

function emptyFormAlert() {
    if(document.getElementById("emptyFormAlert")){
        document.getElementById("emptyFormAlert").remove();
    } else if(document.getElementById("losingAlert")){
        document.getElementById("losingAlert").remove();
    } else if(document.getElementById("winningAlert")){
        document.getElementById("winningAlert").remove();
    } else if(document.getElementById("notEnoughAlert")){
        document.getElementById("notEnoughAlert").remove();
    } else if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-danger alert-dismissible fade show";
    alert.id = "emptyFormAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>Error!</strong> You need to specify an amount! <button type="button" class="btn-close" onclick="document.getElementById('emptyFormAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}