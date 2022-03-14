let applicationName;
let profilePicture;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        profilePicture = user.photoURL;
        applicationName = user.email.split("@").shift();
    }
    else {
        //User is signed out
    }
});

function bet(){
    if(!applicationName == ""){
        if(document.getElementById("betAmount").value != ""){
            firebase.database().ref("GKCscoreboard/" + applicationName).get().then(function(GKCscoreboard_object){
                if(GKCscoreboard_object.exists()){
                    const GKC = GKCscoreboard_object.val().GKC
                    const payAmountCheck = parseInt(document.getElementById("betAmount").value);
                    if(GKC >= payAmountCheck) {
                        firebase.database().ref("jackpot/" + applicationName).set({
                            picture: profilePicture,
                            betAmount: parseInt(document.getElementById("betAmount").value)
                        });
                        firebase.database().ref("GKCscoreboard/" + applicationName).update({
                            GKC: GKC - parseInt(document.getElementById("betAmount").value)
                        });
                        document.getElementById("removeOnJoin").style.display = "none";
                        document.getElementById("playerPicture").style.display = "block";
                        document.getElementById("playerPicture").src = profilePicture;
                        document.getElementById("bettedAmount").innerText = `You have entered the poll with ${payAmountCheck} GKC!`
                        transferSuccessAlert(payAmountCheck);
                        continueGame();
                    } else {
                        notEnoughAlert();
                    }
                }
            });
        }
    } else {
        notAuthAlert();
    }
}

firebase.database().ref("jackpot/").on("value", function(jackpot_object){
    document.querySelectorAll("#gameUsers").forEach(function(element){element.remove()});
    if(jackpot_object.exists()){
        const keys = Object.keys(jackpot_object.val());
        let users = [];
        keys.map(username => {
            users.push({...eval(`jackpot_object.val().${username}`), username});
        })
        users.sort(({betAmount:a}, {betAmount:b}) => b-a);

        let betAmountSum = 0;
        users.forEach(element => {
            betAmountSum = betAmountSum + element.betAmount
        });

        let userChance = [];
        
        for (let i = 0; i < users.length; i++) {
            let username = users[i].username;
            let betAmount = users[i].betAmount;
            let picture = users[i].picture;
            let winChance = parseFloat(betAmount / betAmountSum * 100).toFixed(2);
            
            for (let i = 0; i < parseFloat(betAmount / betAmountSum * 100).toFixed(0); i++) {
                userChance.push(username);
            }
            console.log(userChance);

            if(username == applicationName){
                document.getElementById("removeOnJoin").style.display = "none";
                document.getElementById("playerPicture").style.display = "block";
                document.getElementById("playerPicture").src = profilePicture;
                document.getElementById("bettedAmount").innerText = `You have entered the poll with ${betAmount} GKC!`
                document.getElementById("winningChance").innerText = `Your chance of winning is: ${winChance}%`
            } else {
                console.log(users[i])
                const div = document.createElement("div");
                div.innerHTML = `
                <div class="d-flex justify-content-center align-items-center m-2">
                    <img src="${picture}" style="height: 5vh; margin-right: 10px;">
                    <p style="color: white; margin-top: 12px; margin-right: 10px;"><strong>User:</strong> ${username}</p>
                    <p style="color: white; margin-top: 12px; margin-right: 10px;"><strong>Bet:</strong> ${betAmount} GKC</p>
                    <p style="color: white; margin-top: 12px;"><strong>WinChance:</strong> ${winChance}%</p>
                </div>
                `;
                div.id = "gameUsers";
                document.getElementById("friends").appendChild(div);
            }
        }
    }
});

function findWinner(){

}

function notAuthAlert() {
    if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    } else if(document.getElementById("notEnoughAlert")){
        document.getElementById("notEnoughAlert").remove();
    } else if(document.getElementById("transferSuccessAlert")){
        document.getElementById("transferSuccessAlert").remove();
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

function notEnoughAlert() {
    if(document.getElementById("notEnoughAlert")){
        document.getElementById("notEnoughAlert").remove();
    } else if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    } else if(document.getElementById("transferSuccessAlert")){
        document.getElementById("transferSuccessAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-danger alert-dismissible fade show";
    alert.id = "notEnoughAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>Error!</strong> You don't have enough GKC to perform this action! <button type="button" class="btn-close" onclick="document.getElementById('notEnoughAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}

function transferSuccessAlert(amount) {
    if(document.getElementById("transferSuccessAlert")){
        document.getElementById("transferSuccessAlert").remove();
    } else if(document.getElementById("notAuthAlert")){
        document.getElementById("notAuthAlert").remove();
    } else if(document.getElementById("notEnoughAlert")){
        document.getElementById("notEnoughAlert").remove();
    }
    const alert = document.createElement("div");
    alert.classList = "alert alert-success alert-dismissible fade show";
    alert.id = "transferSuccessAlert";
    alert.style.position = "absolute";
    alert.style.right = "40px";
    alert.style.bottom = "30px";
    alert.innerHTML = `<strong>Success!</strong> You have entered the jackpot poll with ${amount} GKC! <button type="button" class="btn-close" onclick="document.getElementById('transferSuccessAlert').remove()" aria-label="Close"></button>`
    document.body.appendChild(alert);
}