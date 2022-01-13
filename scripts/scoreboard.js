firebase.database().ref("GKCscoreboard/").on("value", function(GKCscoreboard_object){
    document.querySelectorAll("#tableRows").forEach(function(element){element.remove()});
    if(GKCscoreboard_object.exists()){
        const keys = Object.keys(GKCscoreboard_object.val());
        let users = [];
        keys.map(username => {
            users.push({...eval(`GKCscoreboard_object.val().${username}`), username});
        })
        users.sort(({GKC:a}, {GKC:b}) => b-a);
        
        for (let i = 0; i < users.length; i++) {
            let username = users[i].username;
            let userid = users[i].userid;
            let email = users[i].email;
            let GKC = users[i].GKC;
            console.log(users[i])
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `<td>#${i + 1}</td><td>${username}</td><td>${userid}</td><td>${GKC}</td>`;
            tableRow.id = "tableRows";
            document.getElementById("scoreboard").appendChild(tableRow);
            
        }
    }
});