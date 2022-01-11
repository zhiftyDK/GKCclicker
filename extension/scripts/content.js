//GoldCoin
setInterval(() => {
    let uniqueId = `GKC${Math.floor(Math.random() * 999999)}`;
    const GKC = document.createElement("img");
    GKC.src = "https://github.com/CodeZhifty/GKCclicker/blob/main/extension/images/GKC_Animated.gif?raw=true";
    GKC.id = uniqueId;
    GKC.style.position = "absolute";
    GKC.style.zIndex = "99999";
    GKC.style.cursor = "pointer";
    GKC.style.width = "100px";
    GKC.style.top = `${Math.floor(Math.random() * window.innerHeight) * 0.7}px`;
    GKC.style.left = `${Math.floor(Math.random() * window.innerWidth) * 0.7}px`;
    document.body.appendChild(GKC);
    document.querySelectorAll("#" + uniqueId).forEach(element => {
        element.addEventListener("mouseover", function() {
            element.remove();
            new Audio("https://github.com/CodeZhifty/GKCclicker/blob/main/extension/audio/cash_soundeffect.aac?raw=true").play();
            chrome.runtime.sendMessage("+", function (response) {
                console.log(response);
            });
        });
    });
}, (Math.random() + 1) * 60000);