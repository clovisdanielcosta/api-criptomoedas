//Function to hide iframe again video and redirect to page open-page e verify localhost or server
function openPage() { 
        if (location.hostname === "localhost" || 
            location.hostname === "127.0.0.1" || 
            location.hostname === "") {
                window.location = "./open_page.html";
            } else {
                window.location = "https://clovisdanielcosta.github.io/api-criptomoedas/open_page.html";
            }  
} 