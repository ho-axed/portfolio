const langDropMenu = document.querySelector("#dropdownMenu");
const menuOpt = document.querySelector("#menuOptions");
const langBtns = document.querySelectorAll(".langBtns");

let translations; // Define the translations variable

// Function to load translations
async function loadTranslations() {
  const response = await fetch("./translations/translations.json");
  translations = await response.json();
}

// Event handler for the dropdown menu
langDropMenu.addEventListener("click", (event) => {
  event.stopPropagation();
  menuOpt.classList.toggle("active");
});

// Event handler for the language buttons
langBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.getAttribute("data-lang");
    setLanguage(lang);
  });
});

// Close the menu if clicking outside of it
document.addEventListener("click", (event) => {
  if (!langDropMenu.contains(event.target)) {
    menuOpt.classList.remove("active");
  }
});

// Function to set the language
async function setLanguage(language) {
  if (!translations) {
    await loadTranslations();
  }
  localStorage.setItem("language", language);
  document.getElementById("whoTitle").innerHTML = translations[language].whoTitle;
  document.getElementById("whoDesc").innerHTML = translations[language].whoDesc;
}

// Set the saved language when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations();
  const savedLanguage = localStorage.getItem("language") || navigator.language.split("-")[0];
  setLanguage(savedLanguage in translations ? savedLanguage : "en");
});
