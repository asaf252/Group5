document.getElementById("Signup").addEventListener("submit", async function (event) {
    let formHasErrors = false; // משתנה לבדיקה אם יש שגיאות בטופס

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

    const locationCheckbox = document.getElementById("location");
    const locationAccess = locationCheckbox.checked ? "true" : "false";

    const validNameRegex = /^[a-zA-Z]+$/;
    const validPhoneRegex = /^05\d{8}$/;
    const validEmailRegex = /^[a-zA-Z0-9@._-]+$/;

    //------------------- Email Check -------------------
    let errors = [];
    if (emailValue.length === 0) errors.push("This field is required");
    else {
        if (!emailValue.includes("@")) errors.push("The email must contain '@'.");
        if ((emailValue.match(/@/g) || []).length !== 1) errors.push("The email must contain exactly one '@'.");
        const [beforeAt, afterAt] = emailValue.split("@");
        if (!beforeAt || !afterAt) errors.push("The email must have content before and after '@'.");
        if (afterAt && !afterAt.includes(".")) errors.push("The part after '@' must contain a '.'");
        if (!validEmailRegex.test(emailValue)) errors.push("Invalid email format.");
    }
    emailError.textContent = errors.join("\n");
    emailError.style.display = errors.length > 0 ? "block" : "none";
    if (errors.length > 0) formHasErrors = true;

    //------------------- First Name Check -------------------
    let firstNameErrors = [];
    if (firstNameValue.length === 0) firstNameErrors.push("This field is required");
    else {
        if (!validNameRegex.test(firstNameValue)) firstNameErrors.push("First name must contain only English letters.");
        if (firstNameValue.length < 2) firstNameErrors.push("First name must be at least 2 characters long.");
    }
    firstNameError.textContent = firstNameErrors.join("\n");
    firstNameError.style.display = firstNameErrors.length > 0 ? "block" : "none";
    if (firstNameErrors.length > 0) formHasErrors = true;

    //------------------- Last Name Check -------------------
    let lastNameErrors = [];
    if (lastNameValue.length === 0) lastNameErrors.push("This field is required");
    else {
        if (!validNameRegex.test(lastNameValue)) lastNameErrors.push("Last name must contain only English letters.");
        if (lastNameValue.length < 2) lastNameErrors.push("Last name must be at least 2 characters long.");
    }
    lastNameError.textContent = lastNameErrors.join("\n");
    lastNameError.style.display = lastNameErrors.length > 0 ? "block" : "none";
    if (lastNameErrors.length > 0) formHasErrors = true;

    //------------------- Password Check -------------------
    let passwordErrors = [];
    if (passwordValue.length === 0) passwordErrors.push("This field is required.");
    else {
        if (passwordValue.length < 8) passwordErrors.push("Password must be at least 8 characters long.");
        if (!/[A-Z]/.test(passwordValue)) passwordErrors.push("Password must include at least one uppercase letter.");
        if (!/[a-z]/.test(passwordValue)) passwordErrors.push("Password must include at least one lowercase letter.");
        if (!/\d/.test(passwordValue)) passwordErrors.push("Password must include at least one number.");
        if (!/[!@#$%^&*]/.test(passwordValue)) passwordErrors.push("Password must include at least one special character (!@#$%^&*).");
    }
    passwordError.textContent = passwordErrors.join("\n");
    passwordError.style.display = passwordErrors.length > 0 ? "block" : "none";
    if (passwordErrors.length > 0) formHasErrors = true;

    //------------------- Confirm Password Check -------------------
    let confirmPasswordErrors = [];
    if (confirmPasswordValue.length === 0) confirmPasswordErrors.push("This field is required.");
    else if (passwordValue !== confirmPasswordValue) confirmPasswordErrors.push("Passwords do not match.");
    confirmPasswordError.textContent = confirmPasswordErrors.join("\n");
    confirmPasswordError.style.display = confirmPasswordErrors.length > 0 ? "block" : "none";
    if (confirmPasswordErrors.length > 0) formHasErrors = true;

    //------------------- Phone Number Check -------------------
    let phoneErrors = [];
    if (phoneValue.length === 0) phoneErrors.push("This field is required.");
    else if (!validPhoneRegex.test(phoneValue)) phoneErrors.push("Phone number must start with '05' and contain exactly 10 digits.");
    phoneError.textContent = phoneErrors.join("\n");
    phoneError.style.display = phoneErrors.length > 0 ? "block" : "none";
    if (phoneErrors.length > 0) formHasErrors = true;

    // ✅ אם יש שגיאות בטופס, מניעת שליחה
    if (formHasErrors) {
        event.preventDefault();
        return;
    }

    // ✅ **שליחת הנתונים לשרת**
    event.preventDefault(); // מונע טעינה מחדש של העמוד

    const userData = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        phonenumber: phoneValue,
        password: passwordValue,
        location_access: locationAccess
    };

    console.log("📩 Sending registration data:", userData);

    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        console.log("🔄 Server response:", result);

        if (result.success) {
            alert("✅ Registration successful! Redirecting to login...");
            window.location.href = "/";  // מעבר לדף התחברות
        } else {
            alert("❌ " + result.message);
        }
    } catch (error) {
        console.error("❌ Error during registration:", error);
        alert("❌ An error occurred. Please try again later.");
    }
});
