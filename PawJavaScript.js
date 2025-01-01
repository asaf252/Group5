document.getElementById("Signup").addEventListener("submit", function(event) {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailValue = emailInput.value.trim();

    // רשימת סימנים אסורים
    const forbiddenCharacters = [',', '"', '\\', '(', ')', '<', '>', '[', ']', ';', ':', '&', '*'];
    // Regex לבדיקה שהכתובת מכילה רק תווים באנגלית
    const validEnglishRegex = /^[a-zA-Z0-9@._-]+$/;

    // איפוס הודעת השגיאה
    emailError.style.display = "none";
    emailError.textContent = "";



    // בדיקה אם האימייל מכיל @
    if (!emailValue.includes("@")) {
        emailError.textContent = "The email must contain '@'.";
        emailError.style.display = "block";
        event.preventDefault();
        return;
    }

    // בדיקה של חלקים לפני ואחרי @
    const [beforeAt, afterAt] = emailValue.split("@");
    if (!beforeAt || !afterAt) {
        emailError.textContent = "The email must have content before and after '@'.";
        emailError.style.display = "block";
        event.preventDefault();
        return;
    }

    // בדיקה אם יש נקודה אחרי ה-@
    if (!afterAt.includes(".")) {
        emailError.textContent = "The part after '@' must contain a '.'";
        emailError.style.display = "block";
        event.preventDefault();
        return;
    }

    const [beforeDot, afterDot] = afterAt.split(".");
    if (!beforeDot || !afterDot) {
        emailError.textContent = "The email must have content before and after the '.'";
        emailError.style.display = "block";
        event.preventDefault();
        return;
    }

        // בדיקה אם יש סימנים אסורים באימייל
    for (const char of forbiddenCharacters) {
        if (emailValue.includes(char)) {
            emailError.textContent = `The email contains a forbidden character: "${char}".`;
            emailError.style.display = "block";
            event.preventDefault();
            return;
        }
    }

    // בדיקה אם התווים הם רק באנגלית
    if (!validEnglishRegex.test(emailValue)) {
        emailError.textContent = "The email must contain only English letters, numbers, and allowed symbols (@, ., _, -).";
        emailError.style.display = "block";
        event.preventDefault();
        return;
    }

    // אם הכל תקין
    alert("Email is valid!");
});
