document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");

    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // מונע רענון עמוד

        const sortType = document.getElementById("rating-select").value;
        console.log("🔍 Sending search request with:", sortType);

        // מעבר לעמוד TopKennels עם סוג המיון שנבחר
        window.location.href = `/TopKennels?sort=${sortType}`;
    });
});
document.querySelector('.btmType1').addEventListener("click", () => {
    window.location.href = "/";
});
