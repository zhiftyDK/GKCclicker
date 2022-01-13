function flipCoin() {
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
        }
    }
    else if(randomInt == 1) {
        document.getElementById("coinflipButton").disabled = true;
        document.getElementById("redCoinflip").style.display = "block";
        document.getElementById("redCoinflip").play();
        document.getElementById("redCoinflip").onended = function() {
            document.getElementById("coinflipButton").disabled = false;
        }
    }
}
