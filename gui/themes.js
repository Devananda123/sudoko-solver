const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark"))
        themeBtn.innerHTML="☀️ Light Mode";
    else
        themeBtn.innerHTML="🌙 Dark Mode";

});
