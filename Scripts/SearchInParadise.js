document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // מונע רענון של הדף

        const sortType = document.getElementById("rating-select").value;

        // מעבר לעמוד TopKennels עם פרמטרים ב-URL
        const url = `TopKennels.html?sort=${sortType}`;
        window.location.href = url;
    });
});
