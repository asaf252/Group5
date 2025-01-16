document.addEventListener("DOMContentLoaded", function () {
    // שליפת הנתונים מ-localStorage
    const ownerName = localStorage.getItem("ownerName");
    const dogName = localStorage.getItem("dogName");
    const fromDate = localStorage.getItem("fromDate");
    const untilDate = localStorage.getItem("untilDate");
    const kennel = localStorage.getItem("kennel");

    // בדיקה אם הנתונים קיימים והצגתם
    if (ownerName && dogName && fromDate && untilDate && kennel) {
        document.getElementById("stayDates").textContent = `${fromDate} - ${untilDate}`;
        document.getElementById("kennel").textContent = kennel;
        document.getElementById("dogName").textContent = dogName;
        document.getElementById("ownerName").textContent = ownerName;
    } else {
        // במקרה שאין נתונים, הודעה מתאימה
        document.querySelector(".reservation-details").innerHTML = `
            <p>Reservation details are missing. Please return to the reservation page.</p>
        `;
    }

    // כפתור חזרה לעמוד הבית
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function () {
        window.location.href = "HomePage.html";
    });
});
