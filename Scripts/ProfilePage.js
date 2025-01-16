document.addEventListener("DOMContentLoaded", function () {
    function applyResponsiveDesign() {
        const gridProfile = document.querySelector(".GridProfile");
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
});
