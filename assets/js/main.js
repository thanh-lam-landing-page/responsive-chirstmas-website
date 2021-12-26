// @ts-nocheck
import Swiper, { Pagination } from "swiper";

Swiper.use([Pagination]);

/* ----------------- SHOW MENU ---------------- */
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// MENU SHOW
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu?.classList.add("show-menu");
  });
}

// MENU HIDDEN
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu?.classList.remove("show-menu");
  });
}

/* --------- CHANGE BACKGROUND HEADER --------- */
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add effect
  if (this.scrollY >= 50) {
    header?.classList.add("scroll-header");
  } else header?.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/* ---------------- NEW SWIPER ---------------- */
const newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 24,
  loop: true,
  slidesPerView: "auto",
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    dynamicBullets: true,
  },
  breakpoints: {
    992: {
      spaceBetween: 80,
    },
  },
});

/* -------- SCROLL SECTION ACTIVE LINK -------- */
const sections = document.querySelectorAll("section[id]");

function debounce(method, delay) {
  clearTimeout(method._tId);
  method.tId = setTimeout(function () {
    method();
  }, delay);
}

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]")?.classList.add("active-link");
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]")?.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", function () {
  debounce(scrollActive, 200);
});

/* -------------- SHOW SCROLL UP -------------- */
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add scroll up
  if (this.scrollY >= 350) {
    scrollUp?.classList.add("show-scroll");
  } else {
    scrollUp?.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollUp);

/* ------------- DARK LIGHT THEME ------------- */
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun");

if (selectedTheme) {
  document.body?.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton?.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", function () {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/* ---------- SCROLL REVEAL ANIMATION --------- */
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 400,
  // reset: true
});

sr.reveal(".home__image, .new__container, .footer__container");
sr.reveal(".home__data", { delay: 400 });
sr.reveal(".giving__content, .gift__card", { interval: 50 });
sr.reveal(".celebrate__data, .message__form, .footer__img1", { origin: "left" });
sr.reveal(".celebrate__img, .message__img, .footer__img2", { origin: "right" });
