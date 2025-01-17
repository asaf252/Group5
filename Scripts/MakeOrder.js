document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded!");

    const form = document.getElementById("payment-form");
    const priceLabel = document.getElementById("price");
    const confirmButton = document.getElementById("confirmButton");
    const dogNameInput = document.getElementById("dogName");
    const dailyRate = 20; // מחיר יומי

    const selectedDogName = localStorage.getItem("selectedDogName");
    if (selectedDogName) {
        dogNameInput.value = selectedDogName; // עדכון השדה עם שם הכלב
    }

    // פונקציה לחישוב סכום לתשלום
    function calculatePrice() {
        const fromInput = document.getElementById("from").value;
        const untilInput = document.getElementById("until").value;
        const dateError = document.getElementById("dateError");

        if (fromInput && untilInput) {
            const fromDate = new Date(fromInput);
            const untilDate = new Date(untilInput);

            if (untilDate >= fromDate) {
                const timeDifference = untilDate - fromDate;
                const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                const totalPrice = days * dailyRate;
                priceLabel.textContent = `$${totalPrice}`;
                dateError.textContent = "";
            } else {
                priceLabel.textContent = "$0";
                dateError.textContent = "End date cannot be earlier than start date.";
                dateError.style.color = "red";
            }
        } else {
            priceLabel.textContent = "$0";
        }
    }

    // אימות שדה ספציפי
    function validateField(field, errorField, validationFunction) {
        const errorMessage = validationFunction(field.value.trim());
        if (errorMessage) {
            errorField.textContent = errorMessage;
            return false;
        } else {
            errorField.textContent = "";
            return true;
        }
    }

    // פונקציות ולידציה
    function validateOwnerName(value) {
        return value === "" ? "Owner's full name is required." : "";
    }

    function validateDogName(value) {
        return value === "" ? "Dog's name is required." : "";
    }

    function validateKennel(value) {
        return value === "" ? "Please select a kennel." : "";
    }

    function validateCardNumber(value) {
        return value.length !== 16 || !/^\d+$/.test(value)
            ? "Card number must be 16 digits."
            : "";
    }

    function validateCVV(value) {
        return value.length !== 3 || !/^\d+$/.test(value) ? "CVV must be 3 digits." : "";
    }

    function validateExpiryDate(value) {
        if (!/^\d{4}\/\d{2}$/.test(value)) {
            return "Expiry date must be in the format YYYY/MM.";
        }
        const [year, month] = value.split("/");
        const currentDate = new Date();
        const expiryDate = new Date(year, month - 1);
        if (month < 1 || month > 12 || expiryDate < currentDate) {
            return "Invalid or expired card.";
        }
        return "";
    }

    function validateID(value) {
        return !/^\d{9}$/.test(value) ? "ID number must be 9 digits." : "";
    }

    // מאזינים לאירוע blur עבור כל שדה
    document.getElementById("ownerName").addEventListener("blur", function () {
        validateField(
            this,
            document.getElementById("ownerNameError"),
            validateOwnerName
        );
    });

    document.getElementById("dogName").addEventListener("blur", function () {
        validateField(
            this,
            document.getElementById("dogNameError"),
            validateDogName
        );
    });

    document.getElementById("kennel").addEventListener("blur", function () {
        validateField(
            this,
            document.getElementById("kennelError"),
            validateKennel
        );
    });

    document.getElementById("card").addEventListener("blur", function () {
        validateField(
            this,
            document.getElementById("cardError"),
            validateCardNumber
        );
    });

    document.getElementById("cvv").addEventListener("blur", function () {
        validateField(this, document.getElementById("cvvError"), validateCVV);
    });

    document.getElementById("expiry").addEventListener("blur", function () {
        validateField(
            this,
            document.getElementById("expiryError"),
            validateExpiryDate
        );
    });

    document.getElementById("id").addEventListener("blur", function () {
        validateField(this, document.getElementById("idError"), validateID);
    });

    // חישוב מחיר כשהמשתמש בוחר תאריכים
    document.getElementById("from").addEventListener("change", calculatePrice);
    document.getElementById("until").addEventListener("change", calculatePrice);

    // מאזין לכפתור Confirm
    confirmButton.addEventListener("click", function (event) {
        event.preventDefault(); // למנוע רענון של הדף

        // ולידציה מלאה של הטופס
        const isValid =
            validateField(
                document.getElementById("ownerName"),
                document.getElementById("ownerNameError"),
                validateOwnerName
            ) &&
            validateField(
                document.getElementById("dogName"),
                document.getElementById("dogNameError"),
                validateDogName
            ) &&
            validateField(
                document.getElementById("kennel"),
                document.getElementById("kennelError"),
                validateKennel
            ) &&
            validateField(
                document.getElementById("card"),
                document.getElementById("cardError"),
                validateCardNumber
            ) &&
            validateField(
                document.getElementById("cvv"),
                document.getElementById("cvvError"),
                validateCVV
            ) &&
            validateField(
                document.getElementById("expiry"),
                document.getElementById("expiryError"),
                validateExpiryDate
            ) &&
            validateField(
                document.getElementById("id"),
                document.getElementById("idError"),
                validateID
            );

        if (isValid) {
            // שמירת נתונים ב-localStorage
            localStorage.setItem("ownerName", document.getElementById("ownerName").value.trim());
            localStorage.setItem("dogName", document.getElementById("dogName").value.trim());
            localStorage.setItem("kennel", document.getElementById("kennel").value);
            localStorage.setItem("fromDate", document.getElementById("from").value);
            localStorage.setItem("untilDate", document.getElementById("until").value);
            // אם הכל תקין, מעבר לעמוד Thank You
            window.location.href = "Thankyou.html";
        } else {
            alert("Please fix the errors in the form before submitting.");
        }
    });

    // כפתור חזרה
    document.querySelector(".btmType1").addEventListener("click", () => {
        window.location.href = "HomePage.html";
    });
});
