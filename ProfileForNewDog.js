// מאזין לאירוע לחיצה על כפתור Add
document.getElementById('add-dog-btn').addEventListener('click', function (event) {
    let isValid = true;

    // בדיקת Dog Name
    const dogName = document.getElementById('dog-name').value.trim();
    if (dogName.length < 2 || /\d/.test(dogName)) {
        showError('dog-name', 'Dog Name must be at least 2 characters long and contain only letters.');
        isValid = false;
    } else {
        clearError('dog-name');
    }

    // בדיקת Dog Last Name
    const dogLastName = document.getElementById('dog-last-name').value.trim();
    if (dogLastName.length < 2 || /\d/.test(dogLastName)) {
        showError('dog-last-name', 'Dog Last Name must be at least 2 characters long and contain only letters.');
        isValid = false;
    } else {
        clearError('dog-last-name');
    }

    // בדיקת Type
    const type = document.getElementById('type').value;
    if (!type) {
        showError('type', 'Please enter a dog type.');
        isValid = false;
    } else {
        clearError('type');
    }

    // בדיקת Health Level
    const healthLevel = document.getElementById('health-level').value;
    if (!healthLevel) {
        showError('health-level', 'Please enter health level.');
        isValid = false;
    } else {
        clearError('health-level');
    }

    // בדיקת תאריך לידה
    const birthdate = document.getElementById('birthdate').value;
    const today = new Date().toISOString().split('T')[0]; // תאריך היום בפורמט yyyy-mm-dd
    if (!birthdate) {
        showError('birthdate', 'Please enter a birthdate.');
        isValid = false;
    } else if (birthdate > today) {
        showError('birthdate', 'Birthdate must be before today.');
        isValid = false;
    } else {
        clearError('birthdate');
    }

    // בדיקת העלאת תמונה
    const pictureUpload = document.getElementById('dog-picture-upload');
    if (!pictureUpload.files.length) {
        showError('dog-picture', 'You must upload a picture of your dog.');
        isValid = false;
    } else {
        clearError('dog-picture');
    }

    // אם הכל תקין, שולחים את הטופס
    if (isValid) {
        alert('Form submitted successfully!');
    }
});

// פונקציה להצגת שגיאה
function showError(fieldId, message) {
    const errorSpan = document.getElementById(`${fieldId}-error`);
    errorSpan.textContent = message;
    errorSpan.style.color = 'red';
}

// פונקציה לניקוי שגיאות
function clearError(fieldId) {
    const errorSpan = document.getElementById(`${fieldId}-error`);
    errorSpan.textContent = '';
}

// Function to restrict input to only English letters
function restrictNonEnglishInput(event) {
    const regex = /^[A-Za-z]*$/;  // Allows only English letters
    if (!regex.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^A-Za-z]/g, '');  // Remove non-English characters
    }
}



// Adding event listeners to both "Dog Name" and "Dog Last Name"
document.getElementById('dog-name').addEventListener('input', restrictNonEnglishInput);
document.getElementById('dog-last-name').addEventListener('input', restrictNonEnglishInput);
document.getElementById('description').addEventListener('input', restrictNonEnglishInput);
document.getElementById('back-btn').addEventListener('click', function() {
    window.history.back();
});