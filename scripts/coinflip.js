let displayName;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        displayName = user.email.split("@").shift();
    }
});

function flipCoin() {
    firebase.database().ref("GKCscoreboard/" + displayName).get().then(function(GKCscoreboard_object){
        //Check if you have enough money to coinflip
        const gkcCheck = GKCscoreboard_object.val().GKC
        const amountBetCheck = parseInt(document.getElementById("coinflipAmount").value);
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

}

function winningAlert(amountBet) {
    if(document.getElementById("winningAlert")){
        document.getElementById("winningAlert").remove();
    } else if(document.getElementById("losingAlert")){
        document.getElementById("losingAlert").remove();
    } else if(document.getElementById("notEnoughAlert")){
        document.getElementById("notEnoughAlert").remove();
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
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-danger alert-dismissible fade show";
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
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-warning alert-dismissible fade show";
    alert.id = "notEnoughAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>Error!</strong> You don't have enough money to perform this action! <button type="button" class="btn-close" onclick="document.getElementById('notEnoughAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}