document.addEventListener("DOMContentLoaded", function () {
    function applyResponsiveDesign() {
        const gridProfile = document.querySelector(".grid-container");
        const dogPicture = document.querySelector(".dog-picture");

        if (window.innerWidth <= 768) {
            // התאמה למסכים קטנים
            gridProfile.style.gridTemplateColumns = "1fr"; // עמודה אחת בלבד
            dogPicture.style.marginTop = "20px"; // רווח מעל התמונה
            dogPicture.style.maxHeight = "300px"; // גובה מקסימלי של 300 פיקסלים
        } else {
            // התאמה למסכים גדולים יותר
            gridProfile.style.gridTemplateColumns = "1.5fr 1fr"; // שתי עמודות
            dogPicture.style.marginTop = "0"; // אין רווח
            dogPicture.style.maxHeight = "auto"; // גובה אוטומטי
        }
    }

    // הפעלת הפונקציה בעת טעינת הדף
    applyResponsiveDesign();

    // הפעלת הפונקציה מחדש בכל שינוי גודל חלון
    window.addEventListener("resize", applyResponsiveDesign);

    // מאגר נתוני הכלבים
    const dogs = {
        dog1: {
            name: "Marvel",
            lastName: "Gil",
            type: "Labrador",
            description: "Friendly and playful",
            birthdate: "01/01/2020",
            healthLevel: "Excellent",
            image: "../Photos/Marvel.jpeg",
        },
        dog2: {
            name: "Louie",
            lastName: "Halfon",
            type: "Maltese",
            description: "Loyal and energetic",
            birthdate: "21/10/2019",
            healthLevel: "Very Good",
            image: "../Photos/Louie.jpeg",
        },
        dog3: {
            name: "Lucy",
            lastName: "Brown",
            type: "Beagle",
            description: "Curious and affectionate",
            birthdate: "20/08/2021",
            healthLevel: "Good",
            image: "../Photos/Lucy.jpg",
        },
    };

    // אלמנט התפריט הנפתח
    const dogSelect = document.getElementById("dog-select");
    const makeOrderButton = document.getElementById("makeOrderButton");

    // אלמנטים להצגת המידע
    const dogName = document.getElementById("Dogname");
    const dogLastName = document.getElementById("dog-last-name");
    const type = document.getElementById("type");
    const description = document.getElementById("description");
    const birthdate = document.getElementById("birthdate");
    const healthLevel = document.getElementById("health-level");
    const dogPicture = document.querySelector(".dog-picture");

    // מאזין לשינוי הבחירה ב-<select>
    dogSelect.addEventListener("change", function () {
        const selectedDog = dogSelect.value; // הערך שנבחר
        const dogData = dogs[selectedDog]; // קבלת המידע של הכלב שנבחר

        if (dogData) {
            // עדכון המידע בעמוד
            dogName.textContent = dogData.name;
            dogLastName.textContent = dogData.lastName;
            type.textContent = dogData.type;
            description.textContent = dogData.description;
            birthdate.textContent = dogData.birthdate;
            healthLevel.textContent = dogData.healthLevel;
            dogPicture.src = dogData.image; // עדכון התמונה
            dogPicture.alt = dogData.name; // עדכון האלטרנטיבי לתמונה
        }
    });
    // מאזין לכפתור Make Order
    makeOrderButton.addEventListener("click", function () {
        const selectedDog = dogSelect.value; // שם הכלב הנבחר מהתפריט
        const dogData = dogs[selectedDog];
        if (dogData) {
            // שמירת שם הכלב ב-localStorage
            localStorage.setItem("selectedDogName", dogData.name);
            window.location.href = "MakeOrder.html"; // מעבר לעמוד ההזמנה
        }
    });
    // הפעלת ברירת מחדל: הצגת הנתונים של הכלב הראשון
    dogSelect.dispatchEvent(new Event("change"));

    // כפתור חזרה לעמוד הבית
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function () {
        window.location.href = "HomePage.html";
    });
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", function () {
        window.location.href = "ProfileForNewDog.html";
    });
});