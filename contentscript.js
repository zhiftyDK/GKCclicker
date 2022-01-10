//GoldCoin
const cashregisterAudio = new Audio("https://cdn.artlist.io/artlist-sfx-aac-256/338056_ALSFX_SFX_Cash_register_92_normal.aac");
setInterval(() => {
    let uniqueId = `GKC${Math.floor(Math.random() * 999999)}`;
    const GKC = document.createElement("img");
    GKC.src = "https://cdn.discordapp.com/attachments/929297215325884427/929814357171396758/Gorm-Kun_Coin.png";
    GKC.id = uniqueId;
    GKC.style.position = "absolute";
    GKC.style.zIndex = "99999";
    GKC.style.cursor = "pointer";
    document.body.appendChild(GKC);
    document.querySelectorAll("#" + uniqueId).forEach(element => {
        let xPosition = Math.floor(Math.random() * window.innerWidth) * 0.7;
        let yPosition = Math.floor(Math.random() * window.innerHeight) * 0.7;
        let xSpeed = 3;
        let ySpeed = 3;
    
        setInterval(() => {
            if(xPosition + element.clientWidth >= window.innerWidth || xPosition <= 0) {
                xSpeed = -xSpeed;
            }
            if(yPosition + element.clientHeight >= window.innerHeight || yPosition <= 0) {
                ySpeed = -ySpeed;
            }
            xPosition += xSpeed;
            yPosition += ySpeed;
            element.style.left = xPosition + "px";
            element.style.top = yPosition + "px";
        }, 1000/60);

        element.addEventListener("click", function() {
            let GKCnr = parseInt(localStorage.getItem("CurrentGKC")) || 0;
            localStorage.setItem("CurrentGKC", GKCnr + 1);
            cashregisterAudio.play();
            element.remove();
        });
    });
}, (Math.random() + 1) * 30000);