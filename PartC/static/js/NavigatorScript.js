// פונקציה להוספת קישורים לנוויגייטור
function addNavLink(label, href) {
    const nav = document.getElementById('Navigator');
    if (!nav) {
        console.error("Navigator element not found!");
        return;
    }

    if (isCurrentPage(href)) return; // לא להוסיף קישור לעמוד הנוכחי

    const link = document.createElement('a');
    link.textContent = label;
    link.href = href;
    console.log('Adding link:', label, '->', href);
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
    console.log("Fetching login status from /api/check-login-status...");

    fetch('/api/check-login-status', { credentials: "include" }) // שולח session לשרת
        .then(response => response.json())
        .then(data => {
            console.log("Server response:", data);

            const isLoggedIn = data.isLoggedIn;
            console.log("User logged in?", isLoggedIn);

            const nav = document.getElementById("Navigator");
            nav.innerHTML = ""; // מנקה את הניווט לפני שמוסיפים קישורים חדשים

            if (isLoggedIn) {
                addNavLink('Home Page', '/home/home');
                addNavLink('New Order', '/MakeOrder');
                addNavLink('Profile', '/Profile');
                addNavLink('Add Dog', '/AddDog');
                addNavLink('Search Kennel', '/SearchInParadise');

                // יצירת כפתור Logout עם Event Listener
                const logoutLink = document.createElement('a');
                logoutLink.textContent = "Log Out";
                logoutLink.href = "#";  // לא לעבור דף, רק לבצע קריאה לשרת
                logoutLink.addEventListener("click", function (event) {
                    event.preventDefault();
                    logoutUser();
                });

                nav.appendChild(logoutLink);
            } else {
                addNavLink('Log In', '/');
                addNavLink('Sign Up', '/signup');
            }
            addNavLink('About Us', '/about');
        })
        .catch(error => {
            console.error('Error fetching login status:', error);
        });
}

// פונקציה לשליחת בקשת Logout לשרת וניתוב חזרה לעמוד הראשי
function logoutUser() {
    fetch('/logout', { method: "GET", credentials: "include" })
        .then(response => {
            console.log("✅ Logged out successfully!");
            window.location.href = "/";  // מחזיר לדף הבית
        })
        .catch(error => console.error("❌ Error during logout:", error));
}

// קריאה לפונקציה בעת טעינת הדף
document.addEventListener("DOMContentLoaded", setupNavbar);
