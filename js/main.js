const langDropMenu = document.querySelector("#dropdownMenu");
const menuOpt = document.querySelector("#menuOptions");
const langBtns = document.querySelectorAll(".langBtns");
const navOpts = document.querySelectorAll(".navOpts");
const allCont = document.querySelectorAll(".contsAll");
let translations; // Define the translations variable
let projects;
let savedLanguage;
// add active class to the nav
navOpts.forEach((opt) => {
  opt.addEventListener("click", async () => {
    navOpts.forEach((item) => item.classList.remove("active"));
    allCont.forEach((i) => {
      if (i.id !== opt.id) {
        i.classList.remove("active");
      } else {
        i.classList.add("active");
      }
    });
    opt.classList.add("active");

    const id = opt.getAttribute("id");
  });
});
// open mail to send message
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("formName").value;
    const subject = document.getElementById("formSub").value;
    const message = document.getElementById("formMsg").value;

    const mailtoLink = `mailto:thiagomtnez910@gmail.com?subject=${encodeURIComponent(
      subject + " - " + name
    )}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoLink;
  });
document.querySelector("#name").addEventListener("click", ()=> {
  document.querySelector("#certCont").classList.add("active")
})
// PDF files in the system
const pdfFiles = [
  {
    name: "English C2 Level Certificate",
    filePath: "./pdfs/EF SET Certificate.pdf",
  },
  {
    name: "NASA SpaceApps Participant Certificate",
    filePath: "./pdfs/Nasa2024.pdf",
  },
  { name: "Python Development", filePath: "./pdfs/PythonDev.pdf" },
  { name: "AI Development with Python", filePath: "./pdfs/TT_AI.pdf" },
  { name: "Web Development with React", filePath: "./pdfs/TT_DW3.pdf" },
  { name: "Web Development with Node", filePath: "./pdfs/TT_DW4.pdf" },
  { name: "Game Development in Unity", filePath: "./pdfs/UnityDev.pdf" },
  { name: "Basic Web Development", filePath: "./pdfs/WebDev.pdf" },
  { name: "Basic Web Development 2", filePath: "./pdfs/WebDev2.pdf" },
];

// Ref to containers
const pdfList = document.getElementById("pdfList");
const pdfPreviewContainer = document.getElementById("pdfPreviewContainer");

// Create list
pdfFiles.forEach((pdf) => {
  const pdfItem = document.createElement("div");
  pdfItem.textContent = pdf.name;
  pdfItem.className = "pdf-list-item";
  pdfItem.addEventListener("click", () => {
    pdfPreviewContainer.innerHTML = `<embed src="${pdf.filePath}" type="application/pdf" class="pdf-preview">`;
  });
  pdfList.appendChild(pdfItem);
});
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
  document.getElementById("whoTitle").innerHTML =
    translations[language].whoTitle;
  document.getElementById("whoDesc").innerHTML = translations[language].whoDesc;
}

// Set the saved language when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations();
  savedLanguage =
    localStorage.getItem("language") || navigator.language.split("-")[0];
  setLanguage(savedLanguage in translations ? savedLanguage : "en");
});
