// Function to update the width and background color of all elements with the MainStyle class
const updateMainStyleWidth = () => {
    const windowWidth = window.innerWidth; // Get current window width
    const elements = document.querySelectorAll(".MainStyle"); // Select all elements with MainStyle class

    // Loop through each element and update its width
    elements.forEach((element) => {
        element.style.width = `${windowWidth * 0.8}px`; // 80% of the window width
    });

    // Update background color based on window width
    if (windowWidth <= 600) {
        elements.forEach((element) => {
            element.style.backgroundColor = "red"; // For small screens
        });
    } else {
        elements.forEach((element) => {
            element.style.backgroundColor = "blue"; // For larger screens
        });
    }
};

// Run the function initially and on window resize
updateMainStyleWidth();
window.addEventListener("resize", updateMainStyleWidth);
