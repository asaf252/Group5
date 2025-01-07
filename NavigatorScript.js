// פונקציה להוספת קישורים לנוויגייטור
function addNavLink(label, href) {
    const nav = document.getElementById('Navigator');

    // בדיקה אם הקישור מוביל לעמוד הנוכחי
    if (isCurrentPage(href)) {
        return; // אם זה אותו עמוד, לא מוסיפים את הקישור
    }

    // יצירת אלמנט 'a' חדש
    const link = document.createElement('a');
    link.textContent = label; // שם הקישור
    link.href = href; // כתובת הקישור

    // הוספת הקישור לנוויגייטור
    nav.appendChild(link);
}

// פונקציה לבדוק אם זה העמוד הנוכחי
function isCurrentPage(href) {
    const currentPath = window.location.pathname.split('/').pop(); // השם של הקובץ הנוכחי
    const linkPath = href.split('/').pop(); // השם של הקובץ מהקישור
    return currentPath === linkPath;
}

// לוגיקה מותנית להוספת קישורים
function setupNavbar() {
    // הוספת קישורים לכל העמודים הרלוונטיים
    addNavLink('About', 'About.html');
    addNavLink('Add New Dog', 'AddNewDog.html');
    addNavLink('Home Page', 'HomePage.html');
    addNavLink('Dog Profile', 'DogProfile.html');
    addNavLink('Login', 'LoginPage.html');
    addNavLink('Rate Your Stay', 'RateYourStay.html');
    addNavLink('Search in Paradise', 'SearchInParadise.html');
    addNavLink('Sign Up', 'SignUp.html');
    addNavLink('Top Kennels', 'top%20kennels.html');
}

// קריאה לפונקציה בעת טעינת הדף
setupNavbar();
