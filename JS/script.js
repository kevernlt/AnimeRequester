const buttonTheme = document.querySelector("#theme-toggler");

buttonTheme.addEventListener("click", function () {
    document.body.classList.toggle("dark");
});