//GoldCoin
setInterval(() => {
    let uniqueId = `GKC${Math.floor(Math.random() * 999999)}`;
    const GKC = document.createElement("img");
    GKC.src = "images/GKC_Default.png";
    GKC.id = "GKC";
    GKC.style.position = "absolute";
    GKC.style.zIndex = "99999";
    GKC.style.cursor = "pointer";
    document.body.appendChild(GKC);
    document.querySelectorAll("#GKC").forEach(element => {
        element.style.left = Math.floor(Math.random() * window.innerWidth) * 0.9;
        element.style.top = Math.floor(Math.random() * window.innerHeight) * 0.9;

        element.addEventListener("click", function() {
            let GKCnr = parseInt(localStorage.getItem("CurrentGKC")) || 0;
            localStorage.setItem("CurrentGKC", GKCnr + 1);
            element.remove();
            new Audio("https://cdn.artlist.io/artlist-sfx-aac-256/338056_ALSFX_SFX_Cash_register_92_normal.aac").play();
        });
    });
}, (Math.random() + 1) * 30000);