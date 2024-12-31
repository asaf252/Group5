<script>
    // בוחרים את כל תיבות הסימון
    const checkboxes = document.querySelectorAll('.rating input[type="checkbox"]');

    // מוסיפים אירוע שינוי (change) לכל תיבת סימון
    checkboxes.forEach((checkbox, index) => {
       document.addEventListener("DOMContentLoaded", () => {
    // בוחרים את כל תיבות הסימון
    const checkboxes = document.querySelectorAll('.rating input[type="checkbox"]');

    // מוסיפים אירוע שינוי (change) לכל תיבת סימון
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                // מסמנים את כל העצמות הקודמות
                for (let i = 0; i <= index; i++) {
                    checkboxes[i].checked = true;
                }
            } else {
                // מבטלים סימון לכל העצמות שאחרי
                for (let i = index + 1; i < checkboxes.length; i++) {
                    checkboxes[i].checked = false;
                }
            }
        });
    });
});
}
</script>
