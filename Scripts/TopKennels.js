document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sortType = urlParams.get("sort");
    const selectedDog = urlParams.get("dog");

    // נתוני פנסיונים לדוגמה
    const kennels = [
        { name: "Paw Paradise", address: "123 Dog Street, Woof City", grade: 5, contact: "(555) 123-4567" },
        { name: "Happy Tails", address: "456 Bark Lane, Fetchville", grade: 4, contact: "(555) 987-6543" },
        { name: "Bone and Tail", address: "456 Pappy Avenue, Happydog", grade: 3, contact: "(555) 956-4323" },
    ];

    // ניקוי הטבלה לפני הוספת נתונים
    const tableBody = document.querySelector("#kennelsTable tbody");
    tableBody.innerHTML = "";

    // מיון נתונים לפי מה שנבחר
    let sortedKennels;
    if (sortType === "alphabetical") {
        sortedKennels = kennels.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "rate") {
        sortedKennels = kennels.sort((a, b) => b.grade - a.grade);
    } else {
        sortedKennels = kennels; // ללא מיון
    }

    // הוספת הפנסיונים לטבלה
    sortedKennels.forEach((kennel) => {
        const row = document.createElement("tr");

        // שם הפנסיון
        const nameCell = document.createElement("td");
        nameCell.textContent = kennel.name;
        row.appendChild(nameCell);

        // כתובת
        const addressCell = document.createElement("td");
        addressCell.textContent = kennel.address;
        row.appendChild(addressCell);

        // דירוג עם עצמות בלבד
        const gradeCell = document.createElement("td");
        gradeCell.innerHTML = `${'<img src="../Photos/DogBonePic.png" class="LogoBone" alt="Bone">'.repeat(kennel.grade)}`;
        row.appendChild(gradeCell);

        // פרטי קשר
        const contactCell = document.createElement("td");
        const detailsButton = document.createElement("button");
        detailsButton.textContent = "More details";
        detailsButton.className = "btmType1";

        // הוספת אירוע קליק לכפתור
        detailsButton.addEventListener("click", function () {
            // מעבר לעמוד הפרטים עם שם הפנסיון
            const encodedName = encodeURIComponent(kennel.name); // קידוד השם כדי להתאים ל-URL
            location.href = `../Templets/kennelProfile.html?name=${encodedName}`;
        });

        contactCell.innerHTML = `<p>Phone: ${kennel.contact}</p>`;
        contactCell.appendChild(detailsButton);
        row.appendChild(contactCell);

        // הוספת השורה לטבלה
        tableBody.appendChild(row);
    });

    // האזנה ללחיצה על כפתור Back
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function () {
        location.href = "../Templets/SearchInParadise.html"; // שם הקובץ של עמוד החיפוש
    });
});
