// Funkcija za pronalaženje style-a (sa stack overflowa)
function getStyle(cls, name) {
  var element = document.querySelector(cls);
  return element.currentStyle
    ? element.currentStyle[name]
    : window.getComputedStyle
    ? window.getComputedStyle(element, null).getPropertyValue(name)
    : null;
}

// Kod za Sticky Nav i za promjenu backgroun img
const header = document.querySelector(".header-section");
const stickyNav = document.querySelector(".nav-search-container-sticky");

const navObserverCallback = function (entries) {
  const [entry] = entries;
  const elDisplay = getStyle(".small-devices-nav-search-container", "display");
  if (!entry.isIntersecting && elDisplay !== "flex") {
    stickyNav.classList.add("open-nav");
  } else {
    stickyNav.classList.remove("open-nav");
  }
};

const navObserver = new IntersectionObserver(navObserverCallback, {
  root: null,
  threshold: 0,
});

navObserver.observe(header);

/* Kod za navigaciju prilikom skrolanja naniže */
window.addEventListener("scroll", function (event) {
  // promjena bcimg bodya kad nam je news section na pola
  const newsArticles = document.querySelector(
    ".boxing-news__articles-container"
  );
  const elementLoction = newsArticles.getBoundingClientRect();
  if (elementLoction.top < 700) {
    // Kod za boxing news animaciju
    newsArticles.classList.add("active");
    // Kod za backgrounde
    document.querySelector(".background-container.bc-1").style.opacity = 0;
    document.querySelector(".background-container.bc-2").style.opacity = 1;
  } else {
    document.querySelector(".background-container.bc-1").style.opacity = 1;
    document.querySelector(".background-container.bc-2").style.opacity = 0;
  }
});

// Revealing elements on scrolling
const upcomingEvents = document.querySelector(".upcoming-events__container");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.add("active");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

sectionObserver.observe(upcomingEvents);

// KOD ZA COURSEL
const rightArr = document.querySelector(".arrow-right");
const leftArr = document.querySelector(".arrow-left");
const imgContWalker = document.querySelector(
  ".upcoming-events__container-walker"
);
let rightStart = 0;
leftArr.addEventListener("click", function () {
  if (rightStart < 0) {
    let leftClick = rightStart + 34.5;
    imgContWalker.style.left = leftClick + "%";
    rightStart = leftClick;
  }
});
rightArr.addEventListener("click", function () {
  if (rightStart > -69) {
    let rightClick = rightStart - 34.5;
    imgContWalker.style.left = rightClick + "%";
    rightStart = rightClick;
  }
});

// EVENT LISTENER ZA TOGGLE MENU
const menuBtn = document.querySelector(".menu-toggle");
const langEl = document.querySelector(".navigation__language--small-devices");
const searchEl = document.querySelector(".search-small-devices");
const allSubCat = document.querySelectorAll(".navigation__links-on-click");

menuBtn.addEventListener("click", () => {
  // Zatvaranje otvorenih podkategorija
  allSubCat.forEach((link) => {
    link.classList.add("hidden");
  });
  menuBtn.classList.toggle("active");
  document
    .querySelector(".small-devices-nav-search-container")
    .classList.toggle("active");
  document.querySelector(".menu-toggle-right-slide").classList.toggle("active");
  let navLinks = Array.from(
    document.querySelectorAll(".navigation__list-item--small-devices")
  );

  searchEl.classList.toggle("active");

  // Linkovi
  if (menuBtn.classList.contains("active")) {
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("active");
      setTimeout(() => {
        navLinks[i].classList.add("active");
      }, i * 100);
    }

    langEl.classList.remove("active");
    setTimeout(() => {
      langEl.classList.add("active");
    }, 700);
  }

  document.querySelector(".menu-toggle-left-slide").classList.toggle("active");
});

// Prikaz potkategorija
const smallNav = document.querySelector(".small-devices-navigation-list");
smallNav.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("navigation__list-item-link") ||
    e.target.hasAttribute("fill") ||
    e.target.classList.contains("navigation__menu-open")
  ) {
    if (
      e.target
        .closest("li")
        .lastElementChild.classList.contains("navigation__links-on-click")
    ) {
      e.target.closest("li").lastElementChild.classList.toggle("hidden");
    }
  }
  console.log(e.target);
});
