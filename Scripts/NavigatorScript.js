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

    if (isLoggedIn) {
        addNavLink('Log Out', 'LogInPage.html');
        addNavLink('Home Page', 'HomePage.html');
        addNavLink('New Order', 'MakeOrder.html');
        addNavLink('Dogs Profile', 'ProfilePage.html');
        addNavLink('Rate Stay', 'RateYourStay.html');
        addNavLink('Search Kennel', 'SearchInParadise.html');
    } else {
        addNavLink('Log In', 'LogInPage.html');
        addNavLink('Sign Up', 'SignUp.html');
    }

    addNavLink('About Us', 'AboutUS.html');
}

// קריאה לפונקציה בעת טעינת הדף
document.addEventListener("DOMContentLoaded", () => {
    setupNavbar();
});

