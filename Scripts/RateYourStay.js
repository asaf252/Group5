document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('.rating input[type="checkbox"]');

    checkboxes.forEach((checkbox, index) => {
        const label = checkbox.nextElementSibling;

        // אירוע mouseover
        label.addEventListener('mouseover', () => {
            console.log(`Hovering over checkbox: ${index + 1}`);

            // ניקוי כל מחלקות hover ו-to-uncheck
            checkboxes.forEach(cb => cb.nextElementSibling.classList.remove('hover', 'to-uncheck'));

            if (checkbox.checked) {
                // אם העצם מסומנת, הוסף to-uncheck לעצמה ולכל העצמות שאחריה
                checkbox.nextElementSibling.classList.add('to-uncheck'); // העצם הנוכחית
                for (let i = index + 1; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        checkboxes[i].nextElementSibling.classList.add('to-uncheck');
                        //console.log(`Bone ${i + 1} marked as to-uncheck.`);
                    }
                }
            } else {
                // אם העצם לא מסומנת, נוסיף hover לכל העצמות עד העצם הנוכחית בלבד
                for (let i = 0; i <= index; i++) {
                    checkboxes[i].nextElementSibling.classList.add('hover');
                    //console.log(`Bone ${i + 1} marked as hover.`);
                }
            }
        });

        // אירוע mouseout
        label.addEventListener('mouseout', () => {
        //    console.log(`Mouse out from checkbox: ${index + 1}`);
            // ניקוי כל מחלקות hover ו-to-uncheck
            checkboxes.forEach(cb => cb.nextElementSibling.classList.remove('hover', 'to-uncheck'));
        });

        // אירוע שינוי (change)
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
            //    console.log(`Checkbox ${index + 1} checked.`);
                for (let i = 0; i <= index; i++) {
                    checkboxes[i].checked = true;
                }
            } else {
            //    console.log(`Checkbox ${index + 1} unchecked.`);
                for (let i = index + 1; i < checkboxes.length; i++) {
                    checkboxes[i].checked = false;
                }
            }
        });
    });
});

/*100 constrain*/
document.addEventListener("DOMContentLoaded", () => {
    const commentBox = document.getElementById("comment"); // תיבת הטקסט
    const charCount = document.createElement("p"); // יצירת אלמנט להצגת הספירה
    charCount.id = "charCount"; // הוספת מזהה (id) לאלמנט
    charCount.style.fontSize = "0.9rem"; // עיצוב בסיסי
    charCount.style.color = "#5a3a29"; // צבע טקסט
    charCount.textContent = `${commentBox.maxLength} characters remaining`; // טקסט התחלתי
    // הוספת אלמנט הצגת ספירה אחרי תיבת הטקסט
    commentBox.parentNode.insertBefore(charCount, commentBox.nextSibling);
    // מאזין לאירוע הקלדה בתיבת הטקסט
    commentBox.addEventListener("input", () => {
        const remaining = commentBox.maxLength - commentBox.value.length; // חישוב כמות התווים הנותרים
        charCount.textContent = `${remaining} characters remaining`; // עדכון הטקסט
    });
});
/* load visits */
document.addEventListener("DOMContentLoaded", () => {
    // יצירת רשימה קבועה של ביקורים (שיכולה להתעדכן בעתיד מ-Database)
    const visits = [
        { id: 1, label: "Visit 1" },
        { id: 2, label: "Visit 2" },
        { id: 3, label: "Visit 3" },
        { id: 4, label: "Visit 4" }
    ];

    // בחירת אלמנט ה-<select>
    const visitSelect = document.getElementById("dog-select");

    // ניקוי תוכן קודם של <select> אם קיים
    visitSelect.innerHTML = "";

    // לולאה שמוסיפה את האופציות ל-<select>
    visits.forEach((visit) => {
        const option = document.createElement("option"); // יצירת אלמנט <option>
        option.value = visit.id; // ערך האופציה (id)
        option.textContent = visit.label; // טקסט שיוצג באופציה (label)
        visitSelect.appendChild(option); // הוספת האופציה ל-<select>
    });
});
