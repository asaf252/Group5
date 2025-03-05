document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/Profile/data");
        if (!response.ok) {
            throw new Error("Failed to fetch profile data.");
        }
        const data = await response.json();
        console.log("Profile data received:", data);

        // מילוי פרטי משתמש
        const client = data.client || {};
        document.getElementById("firstName").value = client.firstName || "";
        document.getElementById("lastName").value = client.lastName || "";
        document.getElementById("email").value = client.email || "";
        document.getElementById("phone").value = client.phone || "";

        // הצגת הכלבים
        const dogsList = document.getElementById("dogsList");
        dogsList.innerHTML = "";
        data.dogs.forEach(dog => {
            const dogDiv = document.createElement("div");
            dogDiv.className = "dog-item";
            dogDiv.innerHTML = `
        <p><strong>Dog Name:</strong> ${dog.dogName || "N/A"}</p>
        <p><strong>Breed:</strong> ${dog.breed || "N/A"}</p>
        <p><strong>Age:</strong> ${dog.age ? dog.age + " years" : "N/A"}</p>
        <p><strong>Behavior:</strong> ${dog.behaviorNotes || "N/A"}</p>
        <p><strong>Weight:</strong> ${dog.weight ? dog.weight + " kg" : "N/A"}</p>
        <p><strong>Favorite Food:</strong> ${dog.favoriteFood || "N/A"}</p>
        <p><strong>Last Visit:</strong> ${
                dog.lastVisit ? new Date(dog.lastVisit).toLocaleDateString() : "N/A"
            }</p>
        <p><strong>Medical Conditions:</strong> ${
                (dog.medicalConditions && dog.medicalConditions.length) ? dog.medicalConditions.join(", ") : "None"
            }</p>
        <p><strong>Vaccinated:</strong> ${dog.vaccinationStatus ? "Yes" : "No"}</p>
        <button data-dogid="${dog._id}" class="delete-dog-btn">Delete Dog</button>
    `;
            dogsList.appendChild(dogDiv);
        });

        // הצגת הזמנות
        const ordersList = document.getElementById("ordersList");
        ordersList.innerHTML = "";

        data.orders.forEach(order => {
            const orderDiv = document.createElement("div");
            orderDiv.className = "order-item";

            // אם Flask מחזיר datetime בפורמט ISO, למשל "2025-03-05T00:00:00"
            // נשתמש בnew Date(...) ישירות
            const fromDateObj = new Date(order.fromDate);
            const untilDateObj = new Date(order.untilDate);
            const fromDateStr = fromDateObj.toLocaleDateString();
            const untilDateStr = untilDateObj.toLocaleDateString();
            const totalPrice = parseFloat(order.totalPrice || 0).toFixed(2);

            // בדיקה אם אפשר לבטל
            const now = new Date();
            const canCancel = (untilDateObj >= now);

            let cancelButtonHTML;
            if (canCancel) {
                cancelButtonHTML = `<button data-orderid="${order._id}" class="cancel-order-btn">Cancel Order</button>`;
            } else {
                cancelButtonHTML = `<button data-orderid="${order._id}" class="cancel-order-btn" disabled style="opacity:0.6; cursor:not-allowed;" title="Past order">Cancel Order</button>`;
            }

            orderDiv.innerHTML = `
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Kennel:</strong> ${order.kennel || "N/A"}</p>
                <p><strong>Dog:</strong> ${order.dogName || "N/A"}</p>
                <p><strong>From:</strong> ${fromDateStr}</p>
                <p><strong>Until:</strong> ${untilDateStr}</p>
                <p><strong>Total Price:</strong> $${totalPrice}</p>
                ${cancelButtonHTML}
            `;
            ordersList.appendChild(orderDiv);
        });

    } catch (error) {
        console.error("Error loading profile data:", error);
    }

    // כפתור Update Profile + ולידציה
    document.getElementById("updateClientBtn").addEventListener("click", async function () {
        if (!validateClientForm()) return;

        const clientData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            phone: document.getElementById("phone").value
        };
        try {
            const response = await fetch("/Profile/update", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(clientData)
            });
            const result = await response.json();
            if (response.ok) {
                alert("Profile updated successfully!");
            } else {
                alert(`Error updating profile: ${result.error}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    });

    // כפתורי Add New Dog / Make Order
    const addButtons = document.querySelectorAll(".addBtn");
    addButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            if (btn.textContent.includes("Add New Dog")) {
                window.location.href = "/AddDog";
            } else if (btn.textContent.includes("Make an Order")) {
                window.location.href = "/MakeOrder";
            }
        });
    });

    // מחיקת כלב
    document.getElementById("dogsList").addEventListener("click", async function (event) {
        if (event.target.classList.contains("delete-dog-btn")) {
            const dogId = event.target.getAttribute("data-dogid");
            if (confirm("Are you sure you want to delete this dog?")) {
                try {
                    const response = await fetch("/Profile/delete_dog", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({dogId})
                    });
                    const result = await response.json();
                    if (response.ok) {
                        alert("Dog deleted successfully!");
                        location.reload();
                    } else {
                        alert(`Error deleting dog: ${result.error}`);
                    }
                } catch (error) {
                    console.error("Error deleting dog:", error);
                    alert("Failed to delete dog.");
                }
            }
        }
    });

    // ביטול הזמנה (מאזין ל-cancel-order-btn)
    document.getElementById("ordersList").addEventListener("click", async function (event) {
        if (event.target.classList.contains("cancel-order-btn") && !event.target.disabled) {
            const orderId = event.target.getAttribute("data-orderid");
            if (confirm("Are you sure you want to cancel this order?")) {
                try {
                    const response = await fetch("/Profile/cancel_order", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({orderId})
                    });
                    const result = await response.json();
                    if (response.ok) {
                        alert("Order cancelled successfully!");
                        location.reload();
                    } else {
                        alert(`Error cancelling order: ${result.error}`);
                    }
                } catch (error) {
                    console.error("Error cancelling order:", error);
                    alert("Failed to cancel order.");
                }
            }
        }
    });
});

// ולידציה בסיסית לשדות שם פרטי, שם משפחה, טלפון
function validateClientForm() {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const phone = document.getElementById("phone");

    // הודעות שגיאה
    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const phoneError = document.getElementById("phoneError");

    firstNameError.textContent = "";
    lastNameError.textContent = "";
    phoneError.textContent = "";

    // RegEx (2 אותיות באנגלית לפחות, וטלפון = 10 ספרות)
    const nameRegex = /^[A-Za-z]{2,}$/;
    const phoneRegex = /^\d{9}$/;

    let isValid = true;

    // שם פרטי
    if (!nameRegex.test(firstName.value.trim())) {
        firstNameError.textContent = "First name must be at least 2 English letters.";
        isValid = false;
    }
    // שם משפחה
    if (!nameRegex.test(lastName.value.trim())) {
        lastNameError.textContent = "Last name must be at least 2 English letters.";
        isValid = false;
    }
    // טלפון
    if (!phoneRegex.test(phone.value.trim())) {
        phoneError.textContent = "Phone must contain exactly 9 digits.";
        isValid = false;
    }

    return isValid;
}

// כפתור חזרה
document.querySelector('.btmType1').addEventListener("click", () => {
    window.location.href = "/";
});

