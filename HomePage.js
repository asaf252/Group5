document.addEventListener("DOMContentLoaded", function () {
    // כפתור "Search kennel for your dog"
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function () {
        location.href = "SearchInParadise.html"; // קישור לעמוד החיפוש
    });

    // כפתור "Rate kennels"
    const rateButton = document.getElementById("rateButton");
    rateButton.addEventListener("click", function () {
        location.href = "RateYourStay.html"; // קישור לעמוד הדירוג
    });

    // כפתור "My Paw profile"
    const profileButton = document.getElementById("profileButton");
    profileButton.addEventListener("click", function () {
        location.href = "ProfileDog.html"; // קישור לעמוד הפרופיל
    });

    // כפתור "Logout"
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", function () {
        location.href = "LogInPage.html"; // קישור לעמוד ההתחברות
    });
});
