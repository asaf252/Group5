// פונקציה להוספת קישורים לנוויגייטור
function addNavLink(label, href) {
    const nav = document.getElementById('Navigator');
    if (isCurrentPage(href)) return; // לא להוסיף קישור לעמוד הנוכחי
    const link = document.createElement('a');
    link.textContent = label;
    link.href = href;
    nav.appendChild(link);
}

// פונקציה לבדוק אם זה העמוד הנוכחי
function isCurrentPage(href) {
    const currentPath = window.location.pathname.split('/').pop();
    const linkPath = href.split('/').pop();
    return currentPath === linkPath;
}

// לוגיקה מותנית להוספת קישורים
function setupNavbar() {
    const isLoggedIn = true; // סימולציה של התחברות (יש להחליף עם מערכת אמיתית)
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'HomePage.html') {
        // מקרה ייחודי לעמוד HomePage
        if (isLoggedIn) {
            addNavLink('About', 'About.html');
            addNavLink('Add New Dog', 'ProfileForNewDog.html');
            addNavLink('Top Kennels', 'top%20kennels.html');
            addNavLink('Logout', 'LoginPage.html'); // יציאה
        } else {
            addNavLink('About', 'About.html');
            addNavLink('Login', 'LoginPage.html');
            addNavLink('Sign Up', 'SignUp.html');
        }
    } else {
        // מקרה כללי לשאר העמודים
        addNavLink('About', 'About.html');
        addNavLink('Add New Dog', 'ProfileForNewDog.html');
        addNavLink('Home Page', 'HomePage.html');
        if (isLoggedIn) {
            addNavLink('Dog Profile', 'ProfileDog.html');
            addNavLink('Rate Your Stay', 'RateYourStay.html');
            addNavLink('Search in Paradise', 'SearchInParadise.html');
            addNavLink('Logout', 'LoginPage.html');
        } else {
            addNavLink('Login', 'LoginPage.html');
            addNavLink('Sign Up', 'SignUp.html');
        }
    }
}

// קריאה לפונקציה בעת טעינת הדף
document.addEventListener("DOMContentLoaded", () => {
    setupNavbar();
});
