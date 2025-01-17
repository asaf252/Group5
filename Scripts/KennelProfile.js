document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedKennelName = urlParams.get("name")?.trim();

    if (!selectedKennelName) {
        document.body.innerHTML = `
            <div style="text-align: center; margin-top: 50px;">
                <h1 style="color: red;">Error: You arrived at this page incorrectly.</h1>
                <p>Please return to the main page and select a kennel.</p>
                <button onclick="location.href='../Templets/SearchInParadise.html'" class="btmType1">Go Back</button>
            </div>
        `;
        return;
    }

    const kennels = [
        {
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
            grade: 4,
        },
        {
            name: "Happy Tails",
            address: "456 Bark Lane, Fetchville",
            regularPrice: "$20 per night",
            weekendPrice: "$25 per night",
            dogType: "Medium and Large Breeds",
            capacity: "20 Dogs",
            distance: "10 km",
            phoneNumber: "+1-800-HAPPY-TAILS",
            about: "Fun and safety combined with professional care and large yards.",
            imageSrc: "../Photos/kennelDogs2.jpg",
            grade: 5,
        },
        {
            name: "Bone and Tail",
            address: "789 Tail Avenue, Woof Town",
            regularPrice: "$15 per night",
            weekendPrice: "$20 per night",
            dogType: "Small Breeds",
            capacity: "10 Dogs",
            distance: "3 km",
            phoneNumber: "+1-800-BONE-TAIL",
            about: "A small but lovely place with dedicated care for your little companions.",
            imageSrc: "../Photos/kennelDogs3.jpg",
            grade: 3,
        },
    ];

    const selectedKennel = kennels.find((kennel) => kennel.name === selectedKennelName);

    if (!selectedKennel) {
        document.body.innerHTML = `
            <div style="text-align: center; margin-top: 50px;">
                <h1 style="color: red;">Error: The selected kennel was not found.</h1>
                <p>Please return to the main page and select a valid kennel.</p>
                <button onclick="location.href='../Templets/SearchInParadise.html'" style="padding: 10px 20px; font-size: 16px;">Go Back</button>
            </div>
        `;
        return;
    }

    setTimeout(() => {
        document.getElementById("kennel-image").src = selectedKennel.imageSrc;

        const ratingStars = document.getElementById("rating-stars");
        ratingStars.innerHTML = "";
        for (let i = 0; i < selectedKennel.grade; i++) {
            const starImg = document.createElement("img");
            starImg.src = "../Photos/DogBonePic.png";
            starImg.className = "LogoBone";
            starImg.alt = "Dog Bone";
            starImg.className = "LogoBone"
            ratingStars.appendChild(starImg);
        }

        document.getElementById("kennel-name").textContent = selectedKennel.name;
        document.getElementById("address").textContent = selectedKennel.address;
                document.getElementById("capacity").textContent = selectedKennel.capacity;
        document.getElementById("distance").textContent = selectedKennel.distance;
        document.getElementById("regular-price").textContent = selectedKennel.regularPrice;
        document.getElementById("weekend-price").textContent = selectedKennel.weekendPrice;
        document.getElementById("dog-type").textContent = selectedKennel.dogType;
        document.getElementById("about").textContent = selectedKennel.about;
        document.getElementById("phone-number").textContent = selectedKennel.phoneNumber;

    }, 2000);
});

document.getElementById("backButton").addEventListener("click", function () {
    location.href = "../Templets/SearchInParadise.html";
});
