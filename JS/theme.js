const buttonTheme = document.querySelector("#theme-toggler");

const MOON = "⏾";
const SUN = "☀";

function updateIcon() {
    if (!buttonTheme) return;
    buttonTheme.textContent = document.body.classList.contains("dark") ? SUN : MOON;
}

if (sessionStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

updateIcon();

if (buttonTheme) {
    buttonTheme.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        const mode = document.body.classList.contains("dark") ? "dark" : "light";
        sessionStorage.setItem("theme", mode);
        updateIcon();
    });
}