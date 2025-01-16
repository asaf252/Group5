document.addEventListener("DOMContentLoaded", () => {
    // דימוי טעינה (נתונים יטענו לאחר 2 שניות)
    setTimeout(() => {
        const kennelData = {
            name: "Paw Paradise",
            address: "123 Dog Street, Barkville",
            regularPrice: "$25 per night",
            weekendPrice: "$30 per night",
            dogType: "All Breeds",
            capacity: "15 Dogs",
            distance: "5 km",
            phoneNumber: "+1-800-DOG-CARE",
            about: "A cozy and safe place for your dog with 24/7 care and large play areas.",
            imageSrc: "../Photos/kennelDogs.jpg",
            grade: 4 // מספר העצמות
        };

        // עדכון התוכן ב-HTML
        document.getElementById("kennel-name").textContent = kennelData.name;
        document.getElementById("address").textContent = kennelData.address;
        document.getElementById("regular-price").textContent = kennelData.regularPrice;
        document.getElementById("weekend-price").textContent = kennelData.weekendPrice;
        document.getElementById("dog-type").textContent = kennelData.dogType;
        document.getElementById("capacity").textContent = kennelData.capacity;
        document.getElementById("distance").textContent = kennelData.distance;
        document.getElementById("phone-number").textContent = kennelData.phoneNumber;
        document.getElementById("about-kennel").textContent = kennelData.about;
        document.getElementById("kennel-image").src = kennelData.imageSrc;

        // הוספת דירוג (עצמות)
        const ratingStars = document.getElementById("rating-stars");
        ratingStars.innerHTML = ""; // ריקון תוכן קודם
        for (let i = 0; i < kennelData.grade; i++) {
            const starImg = document.createElement("img");
            starImg.src = "../Photos/DogBonePic.png";
            starImg.className = "LogoBone";
            starImg.alt = "Dog Bone";
            ratingStars.appendChild(starImg);
        }
    }, 2000); // המתנה של 2 שניות לדימוי טעינה
});
