document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('.rating input[type="checkbox"]');
    const commentBox = document.getElementById("comment");
    const backButton = document.getElementById("backButton");
    const form = document.querySelector("form"); // מאתר את הטופס באופן כללי

    // לולאה לכל ה-checkboxes לטיפול בתצוגה
    checkboxes.forEach((checkbox, index) => {
        const label = checkbox.nextElementSibling;

        // אירוע mouseover
        label.addEventListener('mouseover', () => {
            checkboxes.forEach(cb => cb.nextElementSibling.classList.remove('hover', 'to-uncheck'));

            if (checkbox.checked) {
                checkbox.nextElementSibling.classList.add('to-uncheck');
                for (let i = index + 1; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        checkboxes[i].nextElementSibling.classList.add('to-uncheck');
                    }
                }
            } else {
                for (let i = 0; i <= index; i++) {
                    checkboxes[i].nextElementSibling.classList.add('hover');
                }
            }
        });

        // אירוע mouseout
        label.addEventListener('mouseout', () => {
            checkboxes.forEach(cb => cb.nextElementSibling.classList.remove('hover', 'to-uncheck'));
        });

        // אירוע שינוי (change)
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                for (let i = 0; i <= index; i++) {
                    checkboxes[i].checked = true;
                }
            } else {
                for (let i = index + 1; i < checkboxes.length; i++) {
                    checkboxes[i].checked = false;
                }
            }
        });
    });

    // עדכון ספירת תווים
    const charCount = document.createElement("p");
    charCount.id = "charCount";
    charCount.style.fontSize = "0.9rem";
    charCount.style.color = "#5a3a29";
    charCount.textContent = `${commentBox.maxLength} characters remaining`;
    commentBox.parentNode.insertBefore(charCount, commentBox.nextSibling);

    commentBox.addEventListener("input", () => {
        const remaining = commentBox.maxLength - commentBox.value.length;
        charCount.textContent = `${remaining} characters remaining`;
    });

    // מאזין ללחיצה על כפתור Submit
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // מניעת שליחת הטופס
        if (commentBox.value.trim() === "") {
            alert("Please fill out the comment box before submitting.");
        } else {
            alert("Thank you! Your feedback has been submitted.");
            window.location.href = "HomePage.html"; // מעבר לעמוד הבית
        }
    });

    // כפתור Back
    backButton.addEventListener("click", () => {
        window.location.href = "HomePage.html";
    });
});
