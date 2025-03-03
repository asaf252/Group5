document.addEventListener("DOMContentLoaded", function () {
    // כפתור "ENTER"
    const loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // מניעת רענון העמוד
        console.log("✅ Form submitted!");

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        if (!emailInput || !passwordInput) {
            console.error("❌ Email or Password input not found!");
            return;
        }

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        console.log("📩 Email:", emailValue, "🔒 Password:", passwordValue);

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailValue, password: passwordValue })
            });

            const result = await response.json();
            console.log("🔄 Server response:", result);

            if (result.success) {
                alert("✅ Login successful! Redirecting to home page...");
                window.location.href = result.redirect;
            } else {
                alert("❌ " + result.message);
            }
        } catch (error) {
            console.error("❌ Error during fetch:", error);
            alert("❌ An error occurred. Please try again later.");
        }
    });
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
