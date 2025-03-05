document.addEventListener("DOMContentLoaded", function () {
    console.log("AddDog page loaded.");

    // מאזין לכפתור ההוספה
    document.getElementById("addDogBtn").addEventListener("click", async function (event) {
        event.preventDefault();
        if (!validateDogForm()) return; // אם הוולידציה נכשלת - לא שולחים

        // איסוף נתונים מהשדות
        const dogName = document.getElementById("dogName").value.trim();
        const breed = document.getElementById("breed").value;
        const age = parseInt(document.getElementById("age").value.trim()) || null;
        const weight = parseFloat(document.getElementById("weight").value.trim()) || null;
        const favoriteFood = document.getElementById("favoriteFood").value.trim();
        const behaviorNotes = document.getElementById("behaviorNotes").value.trim();
        const vaccinationStatus = document.getElementById("vaccinationStatus").value === "yes";

        // איסוף המחלות שסומנו
        const medicalConditions = [];
        document.querySelectorAll('input[name="medicalConditions"]:checked').forEach(checkbox => {
            medicalConditions.push(checkbox.value);
        });

        const dogData = {
            dogName,
            breed,
            age,
            weight,
            favoriteFood,
            behaviorNotes,
            vaccinationStatus,
            medicalConditions
        };

        console.log("📤 Sending data:", JSON.stringify(dogData)); // ✅ רואים בדיוק מה נשלח

        try {
            const response = await fetch("/add_dog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dogData)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Dog added successfully!");
                window.location.href = "/Profile"; // חזרה לדף הפרופיל
            } else {
                alert(`Error adding dog: ${result.error}`);
            }
        } catch (error) {
            console.error("Error adding dog:", error);
            alert("Failed to add dog.");
        }
    });

    // כפתור ביטול - חזרה לפרופיל
    document.getElementById("cancelButton").addEventListener("click", function () {
        window.location.href = "/Profile";
    });
});

// פונקציית ולידציה
function validateDogForm() {
    const dogName = document.getElementById("dogName");
    const breed = document.getElementById("breed");
    const age = document.getElementById("age");
    const weight = document.getElementById("weight");

    // אלמנטים להודעות שגיאה
    const dogNameError = document.getElementById("dogNameError");
    const breedError = document.getElementById("breedError");
    const ageError = document.getElementById("ageError");
    const weightError = document.getElementById("weightError");

    // ניקוי הודעות קודמות
    dogNameError.textContent = "";
    breedError.textContent = "";
    ageError.textContent = "";
    weightError.textContent = "";

    let isValid = true;

    // בדיקת שם הכלב - רק אותיות באנגלית, לפחות 2 תווים
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    if (!nameRegex.test(dogName.value.trim())) {
        dogNameError.textContent = "Dog name must contain at least 2 English letters.";
        isValid = false;
    }

    // בדיקת גזע - חייב לבחור גזע מהרשימה
    if (!breed.value || breed.value === "") {
        breedError.textContent = "Please select a breed.";
        isValid = false;
    }

    // בדיקת גיל - חייב להיות מספר חיובי גדול מ-0
    if (!age.value || isNaN(age.value) || parseInt(age.value) <= 0) {
        ageError.textContent = "Age must be a number greater than 0.";
        isValid = false;
    }

    // בדיקת משקל - חייב להיות מספר חיובי גדול מ-0
    if (!weight.value || isNaN(weight.value) || parseFloat(weight.value) <= 0) {
        weightError.textContent = "Weight must be a number greater than 0.";
        isValid = false;
    }

    return isValid;
}
