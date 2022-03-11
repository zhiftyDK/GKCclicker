let applicationName;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        applicationName = user.email.split("@").shift();
    }
});

let totalGKC = 0;
let totalUsers = 0;
let richestPerson;
firebase.database().ref("GKCscoreboard/").get().then(function(GKCscoreboard_object){
    if(GKCscoreboard_object.exists()){
        const keys = Object.keys(GKCscoreboard_object.val());
        let users = [];
        keys.map(username => {
            users.push({...eval(`GKCscoreboard_object.val().${username}`), username});
        })
        users.sort(({GKC:a}, {GKC:b}) => b-a);

        totalGKC = 0;

        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            totalGKC = element.GKC + totalGKC
        }

        richestPerson = {name: users[0].username, GKC: users[0].GKC}
        totalUsers = users.length;

        const d = new Date();
        const date = `${d.getMonth() + 1}_${d.getDate()}_${d.getFullYear()}`

        firebase.database().ref("statistics/GKC/date" + date).set({
            totalGKC: totalGKC
        });
        firebase.database().ref("statistics/Users/date" + date).set({
            totalUsers: totalUsers
        });
        firebase.database().ref("statistics/Richestperson/date" + date).set({
            richestPerson: richestPerson.GKC
        });
    }
});

//GKC Amount Chart
firebase.database().ref("statistics/GKC/").get().then(function(statistics_object){
    const keys = Object.keys(statistics_object.val());
    let totalGKC = [];
    keys.map(date => {
        totalGKC.push({...eval(`statistics_object.val().${date}`), date});
    })

    let chartArray = [["Date", "GKC"]];
    for (let i = 0; i < totalGKC.length; i++) {
        const element = totalGKC[i];
        chartArray.push([new Date(element.date.replace("date", "").replace(/_/g, "-")), element.totalGKC])
    }
    console.log(chartArray)

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(chartArray);
    
        var options = {
            title: 'GKC amount over time',
            hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };
    
        var chart = new google.visualization.AreaChart(document.getElementById('GKCamountchart'));
        chart.draw(data, options);
    }
});

//Users Chart
firebase.database().ref("statistics/Users/").get().then(function(statistics_object){
    const keys = Object.keys(statistics_object.val());
    let totalUsers = [];
    keys.map(date => {
        totalUsers.push({...eval(`statistics_object.val().${date}`), date});
    })

    let chartArray = [["Date", "Users"]];
    for (let i = 0; i < totalUsers.length; i++) {
        const element = totalUsers[i];
        chartArray.push([new Date(element.date.replace("date", "").replace(/_/g, "-")), element.totalUsers])
    }
    console.log(chartArray)

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(chartArray);
    
        var options = {
            title: 'Users amount over time',
            hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };
    
        var chart = new google.visualization.AreaChart(document.getElementById('Userschart'));
        chart.draw(data, options);
    }
});

//Richest Person Chart
firebase.database().ref("statistics/Richestperson/").get().then(function(statistics_object){
    const keys = Object.keys(statistics_object.val());
    let richestPerson = [];
    keys.map(date => {
        richestPerson.push({...eval(`statistics_object.val().${date}`), date});
    })

    let chartArray = [["Date", "Richestperson"]];
    for (let i = 0; i < richestPerson.length; i++) {
        const element = richestPerson[i];
        chartArray.push([new Date(element.date.replace("date", "").replace(/_/g, "-")), element.richestPerson])
    }
    console.log(chartArray)

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(chartArray);
    
        var options = {
            title: 'Amount of GKC the Richest Person has at specific times',
            hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };
    
        var chart = new google.visualization.AreaChart(document.getElementById('Richestpersonchart'));
        chart.draw(data, options);
    }
});