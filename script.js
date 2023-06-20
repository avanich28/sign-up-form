"use strict";

const root = document.documentElement;
const icon = document.querySelector(".fa-solid");
const error = document.querySelectorAll(".error");
const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");
const [firstName, lastName, email, tel, pwd, confirmPwd] = inputs;
const pwdCheck = document.querySelector(".pwd-check");

icon.addEventListener("click", () => {
  root.classList.toggle("dark");
  root.classList.toggle("light");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
});

// inputs.addEventListener('input', () => )
const msg = Array.from(inputs).map((x) =>
  x.id.includes("_") ? x.id.replace("_", " ") : x.id
);

const validateInput = function (i, message) {
  error[i].textContent = message;
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  inputs.forEach((x, i) =>
    x.value === "" ? validateInput(i, `Please enter your ${msg[i]}.`) : ""
  );
});

firstName.addEventListener("input", (e) => {
  const regex = /^[a-zA-Z0-9_\-\.]{3,15}$/;
  if (e.target.value.match(regex) || e.target.value === "")
    validateInput(0, "");
  else validateInput(0, "Please enter at least 3 letters");
});

lastName.addEventListener("input", (e) => {
  const regex = /^[a-zA-Z0-9_\-\.]{3,15}$/;
  if (e.target.value.match(regex) || e.target.value === "")
    validateInput(1, "");
  else validateInput(1, "Please enter at least 3 letters");
});

email.addEventListener("input", () =>
  email.validity.typeMismatch
    ? validateInput(2, "Please enter in format yourname@example.com")
    : validateInput(2, "")
);

tel.addEventListener("input", (e) => {
  const regex = /^[0][1-9][0-9]{8}$/;
  if (e.target.value.match(regex) || e.target.value === "")
    validateInput(3, "");
  else validateInput(3, "Please enter in format yourname@example.com");
});

pwd.addEventListener("input", (e) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (e.target.value.match(regex) || e.target.value === "")
    validateInput(4, "");
  else
    validateInput(
      4,
      "Enter at least 8 letters with number, lowercase, and uppercase"
    );
});

confirmPwd.addEventListener("input", (e) => {
  if (e.target.value === pwd.value || e.target.value === "") {
    validateInput(5, "");
    pwdCheck.innerHTML =
      '<i class="fa-solid fa-circle-check" style="color: #49e044;"></i>';
  } else if (e.target.value === "") {
    validateInput(5, "");
    pwdCheck.innerHTML = "";
  } else {
    validateInput(5, "Password did not match");
  }
});
