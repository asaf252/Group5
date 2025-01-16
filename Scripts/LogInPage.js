document.addEventListener("DOMContentLoaded", function () {
    // כפתור "ENTER"
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // מניעת רענון העמוד

        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const emailValue = emailInput.value.trim();
        const password = document.getElementById("password").value;

        let errors = []; // רשימת שגיאות עבור האימייל
        const validEmailRegex = /^[a-zA-Z0-9@._-]+$/; // Regex לתווים מותרים בלבד

        // בדיקות תקינות לאימייל
        if (emailValue.length === 0) {
            errors.push("This field is required.");
        } else {
            if (!emailValue.includes("@")) {
                errors.push("The email must contain '@'.");
            }
            let atCount = (emailValue.match(/@/g) || []).length; // סופרים כמה פעמים '@' מופיע
            if (atCount !== 1) {
                errors.push("The email must contain exactly one '@'.");
            }

            const [beforeAt, afterAt] = emailValue.split("@");
            if (!beforeAt || !afterAt) {
                errors.push("The email must have content before and after '@'.");
            }

            if (afterAt && !afterAt.includes(".")) {
                errors.push("The part after '@' must contain a '.'");
            }

            if (!validEmailRegex.test(emailValue)) {
                errors.push("The email must contain only English letters, numbers, and allowed symbols (@, ., _, -).");
            }
        }

        // הצגת שגיאות אימייל
        if (errors.length > 0) {
            emailError.textContent = errors.join("\n");
            emailError.style.display = "block";
        } else {
            emailError.style.display = "none";

            // בדיקת מילוי שדות והעברה לעמוד הבית
            if (password) {
                alert(`Logged in with email: ${emailValue}`);
                location.href = "HomePage.html"; // העברה לעמוד הבית
            } else {
                alert("Please fill out the password.");
            }
        }
    });

    // כפתור "ABOUT US"
    const aboutButton = document.getElementById("aboutButton");
    if (aboutButton) {
        aboutButton.addEventListener("click", function () {
            location.href = "AboutUs.html"; // קישור לעמוד 'ABOUT US'
        });
    }

    // כפתור "FOLLOW US"
    const followButton = document.getElementById("followButton");
    if (followButton) {
        followButton.addEventListener("click", function () {
            window.open("https://www.instagram.com", "_blank"); // פתיחת קישור לאינסטגרם
        });
    }
});
