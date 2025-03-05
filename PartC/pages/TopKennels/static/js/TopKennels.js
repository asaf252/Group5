document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sortType = urlParams.get("sort") || "alphabetical"; // ברירת מחדל מיון אלפביתי

    try {
        // שליחת בקשה לשרת לקבלת הנתונים הממוינים
        const response = await fetch(`/TopKennels/data?sort=${sortType}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("❌ Failed to fetch kennels data.");
        }

        const kennels = await response.json();
        console.log("🔎 Loaded kennels data:", kennels);

        // ניקוי הטבלה לפני הכנסת הנתונים
        const tableBody = document.querySelector("#kennelsTable tbody");
        tableBody.innerHTML = "";

        // הוספת הפנסיונים לטבלה
        kennels.forEach((kennel) => {
            const row = document.createElement("tr");

            // שם הכלביה
            const nameCell = document.createElement("td");
            nameCell.textContent = kennel.name;
            row.appendChild(nameCell);

            // כתובת
            const addressCell = document.createElement("td");
            addressCell.textContent = kennel.Address;
            row.appendChild(addressCell);

            // דירוג
            const gradeCell = document.createElement("td");
            gradeCell.textContent = kennel.grade;
            row.appendChild(gradeCell);

            // יצירת תא עבור פרטי הקשר
            const contactCell = document.createElement("td");

            // יצירת אלמנט <p> עבור מספר הטלפון
            const phoneParagraph = document.createElement("p");
            phoneParagraph.textContent = `📞 ${kennel.PhoneNumber}`;

            // יצירת כפתור "More details"
            const detailsButton = document.createElement("button");
            detailsButton.textContent = "More details";
            detailsButton.className = "btmType1";
            detailsButton.addEventListener("click", function () {
                location.href = `/kennelProfile?kennelId=${kennel._id}`;
            });

            // הוספת מספר הטלפון והכפתור לאותו תא (td)
            contactCell.appendChild(phoneParagraph);
            contactCell.appendChild(detailsButton);
            row.appendChild(contactCell);

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("❌ Error fetching kennels data:", error);
    }

    // כפתור חזרה לחיפוש
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function () {
        location.href = "/SearchInParadise";
    });
});
