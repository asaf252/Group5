document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded!");

    const form = document.getElementById("payment-form");
    form.addEventListener("submit", function (event) {
        const cardInput = document.getElementById("card");
        const cardError = document.getElementById("cardError");
        const cardValue = cardInput.value.trim();

        const cvvInput = document.getElementById("cvv");
        const cvvError = document.getElementById("cvvError");
        const cvvValue = cvvInput.value.trim();

        const expiryInput = document.getElementById("expiry");
        const expiryError = document.getElementById("expiryError");
        const expiryValue = expiryInput.value.trim();

        const idInput = document.getElementById("id");
        const idError = document.getElementById("idError");
        const idValue = idInput.value.trim();

        let cardErrors = [];
        let cvvErrors = [];
        let expiryErrors = [];
        let idErrors = [];

        const validCardRegex = /^\d{16}$/;
        const validCVVRegex = /^\d{3}$/;
        const validExpiryRegex = /^\d{4}\/\d{2}$/;
        const validIDRegex = /^\d{9}$/;

        //------------------- Card Check -------------------
        if (cardValue.length === 0) {
            cardErrors.push("Card number is required.");
        } else if (!validCardRegex.test(cardValue)) {
            cardErrors.push("Card number must be 16 digits.");
        }

        if (cardErrors.length > 0) {
            cardError.textContent = cardErrors.join("\n");
            event.preventDefault();
        } else {
            cardError.textContent = "";
        }

        //------------------- CVV Check -------------------
        if (cvvValue.length === 0) {
            cvvErrors.push("CVV is required.");
        } else if (!validCVVRegex.test(cvvValue)) {
            cvvErrors.push("CVV must be 3 digits.");
        }

        if (cvvErrors.length > 0) {
            cvvError.textContent = cvvErrors.join("\n");
            event.preventDefault();
        } else {
            cvvError.textContent = "";
        }

        //------------------- Expiry Date Check -------------------
        if (expiryValue.length === 0) {
            expiryErrors.push("Expiry date is required.");
        } else if (!validExpiryRegex.test(expiryValue)) {
            expiryErrors.push("Expiry date must be in the format YYYY/MM.");
        }

        if (expiryErrors.length > 0) {
            expiryError.textContent = expiryErrors.join("\n");
            event.preventDefault();
        } else {
            expiryError.textContent = "";
        }

        //------------------- ID Check -------------------
        if (idValue.length === 0) {
            idErrors.push("ID number is required.");
        } else if (!validIDRegex.test(idValue)) {
            idErrors.push("ID number must be 9 digits.");
        }

        if (idErrors.length > 0) {
            idError.textContent = idErrors.join("\n");
            event.preventDefault();
        } else {
            idError.textContent = "";
        }

        //------------------- Final Validation -------------------
        if (
            cardErrors.length === 0 &&
            cvvErrors.length === 0 &&
            expiryErrors.length === 0 &&
            idErrors.length === 0
        ) {
            alert("Payment successful!");
        }
    });
});
