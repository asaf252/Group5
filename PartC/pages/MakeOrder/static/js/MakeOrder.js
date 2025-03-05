

document.addEventListener("DOMContentLoaded", async function () {
    console.log("🔄 Fetching order data...");

    try {
        const response = await fetch("/MakeOrder/data");
        if (!response.ok) {
            throw new Error("❌ Failed to fetch order data.");
        }

        const data = await response.json();
        console.log("✅ Order data received:", data);

        // הכנסת שם מלא לשדה הבעלים (לא ניתן לשינוי)
        const ownerInput = document.getElementById("ownerName");
        ownerInput.value = data.fullName;
        ownerInput.readOnly = true;

        // מילוי רשימת הכלביות מה-DB
        const kennelSelect = document.getElementById("kennel");
        kennelSelect.innerHTML = "<option value='' disabled selected>Select a kennel</option>";
        data.kennels.forEach(kennel => {
            const option = document.createElement("option");
            option.value = kennel.name;
            option.textContent = kennel.name;
            option.dataset.price = kennel.Price;
            option.dataset.weekendPrice = kennel.WeekEndPrice;
            kennelSelect.appendChild(option);
        });

        // מילוי רשימת הכלבים של המשתמש בלבד
        const dogSelect = document.getElementById("dogName");
        dogSelect.innerHTML = "<option value='' disabled selected>Select your dog</option>";
        data.dogs.forEach(dog => {
            const option = document.createElement("option");
            option.value = dog;
            option.textContent = dog;
            dogSelect.appendChild(option);
        });

    } catch (error) {
        console.error("❌ Error loading order data:", error);
    }

    // הגבלת תאריכים: תאריך סיום לא יכול להיות לפני תאריך התחלה
    document.getElementById("from").addEventListener("change", validateDates);
    document.getElementById("until").addEventListener("change", validateDates);

    // חישוב מחיר ההזמנה כאשר תאריכים משתנים
    document.getElementById("from").addEventListener("change", calculatePrice);
    document.getElementById("until").addEventListener("change", calculatePrice);
    document.getElementById("kennel").addEventListener("change", calculatePrice);

    // ✅ מאזין לכפתור "Confirm" ושולח את הנתונים לשרת
    document.getElementById("confirmButton").addEventListener("click", async function (event) {
        event.preventDefault(); // מונע שליחת טופס רגילה

        if (!validateForm()) {
            return; // ❌ אם הטופס לא תקין, לא שולחים
        }

        const kennel = document.getElementById("kennel").value;
        const ownerName = document.getElementById("ownerName").value;
        const dogName = document.getElementById("dogName").value;
        const fromDate = document.getElementById("from").value;
        const untilDate = document.getElementById("until").value;
        const totalPrice = document.getElementById("price").textContent.replace("$", "");

        const orderData = {
            kennel, ownerName, dogName, fromDate, untilDate, totalPrice
        };

        console.log("📦 Sending order data:", orderData);

        try {
            const response = await fetch("/MakeOrder/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();
            if (response.ok) {
                alert("✅ Order placed successfully!");
                document.getElementById("payment-form").reset();

                // ✅ מחזיר את המשתמש לדף הבית לאחר 1.5 שניות
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);

            } else {
                alert(`❌ Error: ${result.error}`);
            }
        } catch (error) {
            console.error("❌ Error submitting order:", error);
            alert("❌ Failed to submit order. Please try again.");
        }
    });

});

function validateDates() {
    const fromDateInput = document.getElementById("from");
    const untilDateInput = document.getElementById("until");
    const fromError = document.getElementById("fromError");
    const untilError = document.getElementById("untilError");

    if (!fromDateInput || !untilDateInput || !fromError || !untilError) {
        console.error("❌ Missing date input fields!");
        return false;
    }

    const fromDate = new Date(fromDateInput.value);
    const untilDate = new Date(untilDateInput.value);

    if (!fromDateInput.value) {
        fromError.textContent = "❌ Please select a start date.";
        return false;
    } else {
        fromError.textContent = ""; // ✅ איפוס הודעה אם הכל תקין
    }

    if (!untilDateInput.value) {
        untilError.textContent = "❌ Please select an end date.";
        return false;
    } else {
        untilError.textContent = ""; // ✅ איפוס הודעה אם הכל תקין
    }

    if (untilDate < fromDate) {
        untilError.textContent = "❌ End date cannot be before start date.";
        untilDateInput.value = ""; // מאפס את תאריך הסיום
        return false;
    } else {
        untilError.textContent = "";
        return true;
    }
}

document.querySelector('.btmType1').addEventListener("click", () => {
    window.location.href = "/";
});

// פונקציה לחישוב העלות בהתאם לימים רגילים וימי שישי-שבת
function calculatePrice() {
    const fromDateInput = document.getElementById("from");
    const untilDateInput = document.getElementById("until");
    const kennelSelect = document.getElementById("kennel");
    const priceLabel = document.getElementById("price");

    if (!fromDateInput.value || !untilDateInput.value || !kennelSelect.value) {
        priceLabel.textContent = "$0";
        return;
    }

    const fromDate = new Date(fromDateInput.value);
    const untilDate = new Date(untilDateInput.value);

    if (!validateDates()) {
        return;
    }

    let weekdayDays = 0;
    let weekendDays = 0;

    let tempDate = new Date(fromDate);
    while (tempDate <= untilDate) {
        let dayOfWeek = tempDate.getDay();
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            weekendDays++;
        } else {
            weekdayDays++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
    }

    const regularPrice = parseFloat(kennelSelect.selectedOptions[0].dataset.price);
    const weekendPrice = parseFloat(kennelSelect.selectedOptions[0].dataset.weekendPrice);

    const totalPrice = (weekdayDays * regularPrice) + (weekendDays * weekendPrice);
    priceLabel.textContent = `$${totalPrice.toFixed(2)}`;

    console.log(`📅 Regular Days: ${weekdayDays}, Weekend Days: ${weekendDays}`);
    console.log(`💰 Regular Price: ${regularPrice}, Weekend Price: ${weekendPrice}`);
}

function validateForm() {
    const kennelSelect = document.getElementById("kennel");
    const dogSelect = document.getElementById("dogName");
    const fromDate = document.getElementById("from");
    const untilDate = document.getElementById("until");
    const priceLabel = document.getElementById("price");

    // איפוס הודעות שגיאה לפני הבדיקה מחדש
    document.getElementById("kennelError").textContent = "";
    document.getElementById("dogNameError").textContent = "";
    document.getElementById("fromError").textContent = "";
    document.getElementById("untilError").textContent = "";
    document.getElementById("priceError").textContent = "";

    let isValid = true;

    if (!kennelSelect.value) {
        document.getElementById("kennelError").textContent = "❌ Please select a kennel.";
        isValid = false;
    }

    if (!dogSelect.value) {
        document.getElementById("dogNameError").textContent = "❌ Please select a dog.";
        isValid = false;
    }

    if (!validateDates()) {
        isValid = false;
    }

    if (priceLabel.textContent === "$0") {
        document.getElementById("priceError").textContent = "❌ Invalid booking price. Check your date range.";
        isValid = false;
    }

    return isValid;
}

