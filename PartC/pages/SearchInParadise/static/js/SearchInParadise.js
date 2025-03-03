document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");

    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // מונע רענון עמוד

        const sortType = document.getElementById("rating-select").value;
        console.log("🔍 Sending search request with:", sortType);

        try {
            const response = await fetch("/SearchInParadise/results?sort=" + sortType, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();
            console.log("🔎 Search results:", data); // הדפסת הנתונים שהתקבלו

            if (data.length > 0) {
                sessionStorage.setItem("kennelResults", JSON.stringify(data)); // שמירת הנתונים
                window.location.href = "/kennelProfile"; // מעבר לדף התוצאות
            } else {
                alert("❌ No results found.");
            }

        } catch (error) {
            console.error("❌ Error fetching search results:", error);
        }
    });
});
