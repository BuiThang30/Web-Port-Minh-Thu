document.addEventListener("DOMContentLoaded", function() {
    // Nếu click vào Logo ở trang Home, cũng clear localStorage cho an toàn
    const homeLink = document.getElementById("homeLink");
    if (homeLink) {
        homeLink.addEventListener("click", function() {
            localStorage.clear();
        });
    }

    const startButton = document.getElementById("startBtn");
    if (startButton) {
        startButton.addEventListener("click", function() {
            // Chuyển hướng sang Route /assessment của Server
            window.location.href = "/assessment";
        });
    }
});