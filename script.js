"use strict";

const root = document.documentElement;
const icon = document.querySelector(".fa-solid");
const arrow = document.querySelector(".fa-angles-down");
const formSection = document.querySelector(".sign-up");
const libraryImg = document.querySelector(".library-img");
const error = document.querySelectorAll(".error");
const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");
const pwdCheck = document.querySelector(".pwd-check");
const [firstName, lastName, email, tel, pwd, confirmPwd] = inputs;

const bodyEl = document.querySelector("body");
const headerForm = document.querySelector(".header-form");
const mainForm = document.querySelector(".container");
const overlay = document.querySelector(".overlay");

// Theme
icon.addEventListener("click", () => {
  root.classList.toggle("dark");
  root.classList.toggle("light");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
});

// Form validation & Error message
const validateInput = function (event, testRegex, i, msg) {
  if (event === null && testRegex === null) {
    error[i].textContent = msg;
  } else {
    if (event.target.value.match(testRegex) || event.target.value === "")
      error[i].textContent = "";
    else error[i].textContent = msg;
  }
};

const inputName = Array.from(inputs).map((x) =>
  x.id.includes("_") ? x.id.replace("_", " ") : x.id
);

// Check input
let checks = new Array(6).fill(false);

const checkInput = (e, regex) => (e.target.value.match(regex) ? true : false);

// Inputs
firstName.addEventListener("input", (e) => {
  const regex = /^[a-zA-Z0-9_\-\.]{3,15}$/;
  checks[0] = checkInput(e, regex);
  validateInput(e, regex, 0, "Please enter at least 3 letters");
});

lastName.addEventListener("input", (e) => {
  const regex = /^[a-zA-Z0-9_\-\.]{3,15}$/;
  checks[1] = checkInput(e, regex);
  validateInput(e, regex, 1, "Please enter at least 3 letters");
});

email.addEventListener("input", () => {
  if (email.validity.typeMismatch) {
    validateInput(null, null, 2, "Please enter in format yourname@example.com");
  } else {
    validateInput(null, null, 2, "");
    checks[2] = true;
  }
});

tel.addEventListener("input", (e) => {
  const regex = /^[0][1-9]{2}\s[0-9]{3}\s[0-9]{4}$/;
  checks[3] = checkInput(e, regex);
  validateInput(e, regex, 3, "Please enter in format 091 234 5678");
});

pwd.addEventListener("input", (e) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  checks[4] = checkInput(e, regex);
  console.log(checks[4]);
  validateInput(
    e,
    regex,
    4,
    "Enter at least 8 letters with number, lowercase, and uppercase"
  );
});

confirmPwd.addEventListener("input", (e) => {
  if (e.target.value === pwd.value && checks[4] === true) {
    checks[5] = true;
    validateInput(null, null, 5, "");
    pwdCheck.innerHTML =
      '<i class="fa-solid fa-circle-check" style="color: #49e044;"></i>';
  } else if (e.target.value === "") {
    validateInput(null, null, 5, "");
    pwdCheck.innerHTML = "";
  } else {
    validateInput(null, null, 5, "Password did not match");
  }
});

// Button submit
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (checks.every((x) => x === true)) {
    icon.style.display = "none";
    headerForm.style.display = "none";
    mainForm.style.display = "none";
    root.classList.add("overlay");
    bodyEl.classList.add("overlay");
    overlay.style.visibility = "visible";
    overlay.style.animation = "refreshMobile 2s forwards";
    overlay.style.overflow = "auto";
  } else {
    inputs.forEach((x, i) =>
      x.value === ""
        ? validateInput(null, null, i, `Please enter your ${inputName[i]}.`)
        : ""
    );
  }
});

// Arrow-down scrolling
arrow.addEventListener("click", function () {
  formSection.scrollIntoView({ behavior: "smooth" });
});

// Scroll animation on library image
window.addEventListener("scroll", () => {
  document.body.style.setProperty("--scroll", window.pageYOffset + "px");
});
