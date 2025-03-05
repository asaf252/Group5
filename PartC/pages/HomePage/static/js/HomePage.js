document.addEventListener("DOMContentLoaded", function () {
    // כפתור "Search kennel for your dog"
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function () {
         window.location.href = "/SearchInParadise";
    });

    // כפתור "Rate kennels"
    const rateButton = document.getElementById("AddDog");
    rateButton.addEventListener("click", function () {
        location.href = "/AddDog";
    });

    // כפתור "My Paw profile"
profileButton.addEventListener("click", function () {
    window.location.href = "/Profile"; // הפניה ישירה לנתיב הנכון ב-Flask
});


});


