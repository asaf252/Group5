document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded!");

    const form = document.getElementById("payment-form");
    const priceLabel = document.getElementById("price");

    const dailyRate = 20; // מחיר יומי

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

    // פונקציות לאימות שדות
    function validateOwnerName() {
        const ownerNameInput = document.getElementById("ownerName");
        const ownerNameError = document.getElementById("ownerNameError");
        if (ownerNameInput.value.trim() === "") {
            ownerNameError.textContent = "Owner's full name is required.";
        } else {
            ownerNameError.textContent = "";
        }
    }

    function validateDogName() {
        const dogNameInput = document.getElementById("dogName");
        const dogNameError = document.getElementById("dogNameError");
        if (dogNameInput.value.trim() === "") {
            dogNameError.textContent = "Dog's name is required.";
        } else {
            dogNameError.textContent = "";
        }
    }

    function validateDates() {
        const fromInput = document.getElementById("from");
        const untilInput = document.getElementById("until");
        const dateError = document.getElementById("dateError");

        const fromValue = fromInput.value;
        const untilValue = untilInput.value;

        if (fromValue === "" || untilValue === "") {
            dateError.textContent = "Both start and end dates are required.";
        } else {
            const fromDate = new Date(fromValue);
            const untilDate = new Date(untilValue);
            if (untilDate < fromDate) {
                dateError.textContent = "End date cannot be earlier than start date.";
            } else {
                dateError.textContent = "";
            }
        }
    }

    function validateCardNumber() {
        const cardInput = document.getElementById("card");
        const cardError = document.getElementById("cardError");
        const cardValue = cardInput.value.trim();
        if (cardValue.length !== 16 || !/^\d+$/.test(cardValue)) {
            cardError.textContent = "Card number must be 16 digits.";
        } else {
            cardError.textContent = "";
        }
    }

    function validateCVV() {
        const cvvInput = document.getElementById("cvv");
        const cvvError = document.getElementById("cvvError");
        const cvvValue = cvvInput.value.trim();
        if (cvvValue.length !== 3 || !/^\d+$/.test(cvvValue)) {
            cvvError.textContent = "CVV must be 3 digits.";
        } else {
            cvvError.textContent = "";
        }
    }

    function validateExpiryDate() {
        const expiryInput = document.getElementById("expiry");
        const expiryError = document.getElementById("expiryError");
        const expiryValue = expiryInput.value.trim();
        if (!/^\d{4}\/\d{2}$/.test(expiryValue)) {
            expiryError.textContent = "Expiry date must be in the format YYYY/MM.";
        } else {
            const [year, month] = expiryValue.split('/');
            const currentDate = new Date();
            const expiryDate = new Date(year, month - 1);
            if (month < 1 || month > 12 || expiryDate < currentDate) {
                expiryError.textContent = "Invalid or expired card.";
            } else {
                expiryError.textContent = "";
            }
        }
    }

    function validateID() {
        const idInput = document.getElementById("id");
        const idError = document.getElementById("idError");
        const idValue = idInput.value.trim();
        if (!/^\d{9}$/.test(idValue)) {
            idError.textContent = "ID number must be 9 digits.";
        } else {
            idError.textContent = "";
        }
    }

    function validateKennel() {
        const kennelInput = document.getElementById("kennel");
        const kennelError = document.getElementById("kennelError");
        if (!kennelInput.value) {
            kennelError.textContent = "Please select a kennel.";
        } else {
            kennelError.textContent = "";
        }
    }

    // חישוב מחיר כשהמשתמש בוחר תאריכים
    document.getElementById("from").addEventListener("change", calculatePrice);
    document.getElementById("until").addEventListener("change", calculatePrice);

    // מאזינים לאירוע blur עבור כל שדה
    document.getElementById("ownerName").addEventListener("blur", validateOwnerName);
    document.getElementById("dogName").addEventListener("blur", validateDogName);
    document.getElementById("from").addEventListener("blur", validateDates);
    document.getElementById("until").addEventListener("blur", validateDates);
    document.getElementById("card").addEventListener("blur", validateCardNumber);
    document.getElementById("cvv").addEventListener("blur", validateCVV);
    document.getElementById("expiry").addEventListener("blur", validateExpiryDate);
    document.getElementById("id").addEventListener("blur", validateID);
    document.getElementById("kennel").addEventListener("blur", validateKennel);

    // מאזין להגשת הטופס
   form.addEventListener("submit", function (event) {
    event.preventDefault(); // למנוע רענון של הדף

    validateOwnerName();
    validateDogName();
    validateDates();
    validateCardNumber();
    validateCVV();
    validateExpiryDate();
    validateID();

    const errors = document.querySelectorAll(".error");
    const hasErrors = Array.from(errors).some((error) => error.textContent !== "");

    if (!hasErrors) {
        // שמירת הנתונים ב-localStorage
        const ownerName = document.getElementById("ownerName").value.trim();
        const dogName = document.getElementById("dogName").value.trim();
        const fromDate = document.getElementById("from").value;
        const untilDate = document.getElementById("until").value;
        const kennel = document.getElementById("kennel").value; // שדה בחירת הפנסיון

        localStorage.setItem("ownerName", ownerName);
        localStorage.setItem("dogName", dogName);
        localStorage.setItem("fromDate", fromDate);
        localStorage.setItem("untilDate", untilDate);
        localStorage.setItem("kennel", kennel);

        // מעבר לעמוד Thank You
        window.location.href = "Thankyou.html";
    } else {
        alert("Please fix the errors in the form before submitting.");
    }
});

    // כפתור חזרה
    document.querySelector('.btmType1').addEventListener("click", () => {
        window.location.href = "HomePage.html";
    });
});
