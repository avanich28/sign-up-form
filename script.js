"use strict";

const root = document.documentElement;
const icon = document.querySelector(".fa-solid");

icon.addEventListener("click", () => {
  root.classList.toggle("dark");
  root.classList.toggle("light");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
});
