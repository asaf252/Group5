document.getElementById("Signup").addEventListener("submit", function (event) {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailValue = emailInput.value.trim();

    const firstNameInput = document.getElementById("firstname");
    const firstNameError = document.getElementById("firstnameError");
    const firstNameValue = firstNameInput.value.trim();

    const lastNameInput = document.getElementById("lastname");
    const lastNameError = document.getElementById("lastnameError");
    const lastNameValue = lastNameInput.value.trim();

    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    const passwordValue = passwordInput.value.trim();

    const confirmPasswordInput = document.getElementById("confirmpassword");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const confirmPasswordValue = confirmPasswordInput.value.trim();

    const phoneInput = document.getElementById("phonenumber");
    const phoneError = document.getElementById("phonenumberError");
    const phoneValue = phoneInput.value.trim();


    let errors = []; // רשימת שגיאות עבור האימייל
    let firstNameErrors = []; // רשימת שגיאות עבור first name
    let lastNameErrors = []; // רשימת שגיאות עבור last name
    let passwordErrors = []; // שגיאות עבור סיסמה
    let confirmPasswordErrors = []; // שגיאות עבור אימות סיסמה
    let phoneErrors = []; // שגיאות עבור מספר טלפון

    const validNameRegex = /^[a-zA-Z]+$/; // רק אותיות באנגלית
    const validPhoneRegex = /^05\d{8}$/; // Regex לבדיקה שמתחיל ב-05 ומכיל 10 ספרות
    const validEmailRegex = /^[a-zA-Z0-9@._-]+$/;


    //------------------- email check -------------------
    if (emailValue.length === 0)
        errors.push("This field is required");
    else {
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
        event.preventDefault();
    } else {
        emailError.style.display = "none";
    }

    //------------------- firstName -------------------


    if (firstNameValue.length === 0) firstNameErrors.push("This field is required");

    else {
        if (!validNameRegex.test(firstNameValue)) {
            firstNameErrors.push("First name must contain only English letters.");
        }


        if (firstNameValue.length < 2) {
            firstNameErrors.push("First name must be at least 2 characters long.");
        }
    }
    // הצגת שגיאות First Name
    if (firstNameErrors.length > 0) {
        firstNameError.textContent = firstNameErrors.join("\n");
        firstNameError.style.display = "block";
        event.preventDefault();
    } else {
        firstNameError.style.display = "none";
    }

    //------------------- Lastname -------------------
    if (lastNameValue.length === 0) lastNameErrors.push("This field is required");

    else {
        if (!validNameRegex.test(lastNameValue)) {
            lastNameErrors.push("Last name must contain only English letters.");
        }
        if (lastNameValue.length < 2) {
            lastNameErrors.push("Last name must be at least 2 characters long.");
        }
    }
    // הצגת שגיאות Last Name
    if (lastNameErrors.length > 0) {
        lastNameError.textContent = lastNameErrors.join("\n");
        lastNameError.style.display = "block";
        event.preventDefault();
    } else {
        lastNameError.style.display = "none";
    }

    //------------------- password -------------------
    if (passwordValue.length === 0) {
        passwordErrors.push("This field is required.");
    } else {
        if (passwordValue.length < 8) {
            passwordErrors.push("Password must be at least 8 characters long.");
        }
        if (!/^[A-Za-z\d!@#$%^&*]+$/.test(passwordValue)) {
            passwordErrors.push("Password must contain only English letters, numbers, and special characters (!@#$%^&*).");
        }
        if (!/[A-Z]/.test(passwordValue)) {
            passwordErrors.push("Password must include at least one uppercase letter.");
        }
        if (!/[a-z]/.test(passwordValue)) {
            passwordErrors.push("Password must include at least one lowercase letter.");
        }
        if (!/\d/.test(passwordValue)) {
            passwordErrors.push("Password must include at least one number.");
        }
        if (!/[!@#$%^&*]/.test(passwordValue)) {
            passwordErrors.push("Password must include at least one special character (!@#$%^&*).");
        }
    }

    // הצגת שגיאות עבור הסיסמה
    if (passwordErrors.length > 0) {
        passwordError.textContent = passwordErrors.join("\n");
        passwordError.style.display = "block";
        event.preventDefault();
    } else {
        passwordError.style.display = "none";
    }

    //------------------- confirmpassword -------------------
    if (confirmPasswordValue.length === 0) {
        confirmPasswordErrors.push("This field is required.");
    } else if (passwordValue !== confirmPasswordValue) {
        confirmPasswordErrors.push("Passwords do not match.");
    }

    // הצגת שגיאות עבור אימות סיסמה
    if (confirmPasswordErrors.length > 0) {
        confirmPasswordError.textContent = confirmPasswordErrors.join("\n");
        confirmPasswordError.style.display = "block";
        event.preventDefault();
    } else {
        confirmPasswordError.style.display = "none";
    }

    // אם הכל תקין
    if (errors.length === 0 && firstNameErrors.length === 0 && lastNameErrors.length === 0) {
        alert("Form is valid!");
    }
    //------------------- Phone -------------------
    if (phoneValue.length === 0) {
        phoneErrors.push("This field is required.");
    } else if (!validPhoneRegex.test(phoneValue)) {
        phoneErrors.push("Phone number must start with '05' and contain exactly 10 digits.");
    }

    // הצגת שגיאות עבור מספר טלפון
    if (phoneErrors.length > 0) {
        phoneError.textContent = phoneErrors.join("\n");
        phoneError.style.display = "block";
        event.preventDefault(); // עצירת שליחת הטופס במקרה של שגיאה
    } else {
        phoneError.style.display = "none";
    }
});
