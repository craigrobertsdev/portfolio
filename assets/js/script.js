const htmlElement = document.querySelector("html");
const headerSection = document.querySelector("header");
const aboutMeSection = document.getElementById("about-me");
const projectsSection = document.getElementById("projects");
const contactSection = document.getElementById("contact");
const resumeButton = document.getElementById("resume-btn");
const homeIndicator = document.getElementById("home-indicator");
const aboutMeIndicator = document.getElementById("about-me-indicator");
const projectsIndicator = document.getElementById("projects-indicator");
const contactIndicator = document.getElementById("contact-indicator");
const homeIndicatorBar = document.getElementById("home-indicator-bar");
const aboutMeIndicatorBar = document.getElementById("about-me-indicator-bar");
const projectsIndicatorBar = document.getElementById("projects-indicator-bar");
const contactIndicatorBar = document.getElementById("contact-indicator-bar");
const indicatorContainer = document.getElementById("container");
const currentIndicatorEl = document.getElementById("current-indicator");
const hamburger = document.querySelector(".hamburger-menu");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");

// for all rem based calculations
const rem = parseInt(
  window.getComputedStyle(htmlElement).getPropertyValue("font-size"),
  10
);

// globals
let currentIndicator, currentIndicatorBar;
let prevScrollY = 0;
let containerHeight;
let indicatorStyles = {};
let indicatorBarStyles = {};

// setting padding for html element
htmlElement.style.padding = "20px";

// event listeners
window.addEventListener("resize", calculateSizeAndPosition);
document.addEventListener("scroll", handleScrollForPositionIndicator);
resumeButton.addEventListener("click", openResume);

// hamburger menu events
hamburger.addEventListener("click", toggleMenu);
menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", closeMenu);
});

// setting size of landing screen based on client screen size
function setViewportHeight() {
  let viewportHeight = window.innerHeight;
  const htmlPadding = pxToNumber(htmlElement.style.padding);
  headerSection.style.height = viewportHeight - htmlPadding + "px";
}

// apply vertical positions to indicator links
function setContainerHeightandIndicatorPositions() {
  containerHeight = container.offsetHeight;
  indicatorStyles = {
    homeIndicator: {
      top: 0,
    },
    aboutMeIndicator: {
      top: containerHeight / 4 + "px",
    },
    projectsIndicator: {
      top: containerHeight / 2 + "px",
    },
    contactIndicator: {
      top: containerHeight - containerHeight / 4 + "px",
    },
  };

  indicatorBarStyles = {
    homeIndicatorBar: {
      top: "2px",
    },
    aboutMeIndicatorBar: {
      top: containerHeight / 4 + 2 + "px",
    },
    projectsIndicatorBar: {
      top: containerHeight / 2 + 2 + "px",
    },
    contactIndicatorBar: {
      top: containerHeight - containerHeight / 4 + 2 + "px",
    },
  };
}

// position indicator logic
function handleScrollForPositionIndicator() {
  if (window.scrollY > prevScrollY) {
    // scrolling downwards
    if (window.scrollY >= getVerticalOffsetTop(contactSection)) {
      setCurrentIndicatorStyle(contactIndicator, contactIndicatorBar);
    } else if (window.scrollY >= getVerticalOffsetTop(projectsSection)) {
      setCurrentIndicatorStyle(projectsIndicator, projectsIndicatorBar);
    } else if (window.scrollY >= getVerticalOffsetTop(aboutMeSection)) {
      setCurrentIndicatorStyle(aboutMeIndicator, aboutMeIndicatorBar);
    } else {
      setCurrentIndicatorStyle(homeIndicator, homeIndicatorBar);
    }
  } else {
    // scrolling upwards
    if (window.scrollY >= getVerticalOffsetBottom(contactSection)) {
      setCurrentIndicatorStyle(contactIndicator, contactIndicatorBar);
    } else if (window.scrollY >= getVerticalOffsetBottom(projectsSection)) {
      setCurrentIndicatorStyle(projectsIndicator, projectsIndicatorBar);
    } else if (window.scrollY >= getVerticalOffsetBottom(aboutMeSection)) {
      setCurrentIndicatorStyle(aboutMeIndicator, aboutMeIndicatorBar);
    } else {
      setCurrentIndicatorStyle(homeIndicator, homeIndicatorBar);
    }
  }

  prevScrollY = window.scrollY;
}

// set vertical positions for the position indicators and bars
function setScrollIndicatorPositions() {
  setIndicatorContainerHeight();
  homeIndicator.style.top = indicatorStyles.homeIndicator.top;
  aboutMeIndicator.style.top = indicatorStyles.aboutMeIndicator.top;
  projectsIndicator.style.top = indicatorStyles.projectsIndicator.top;
  contactIndicator.style.top = indicatorStyles.contactIndicator.top;

  homeIndicatorBar.style.top = indicatorBarStyles.homeIndicatorBar.top;
  aboutMeIndicatorBar.style.top = indicatorBarStyles.aboutMeIndicatorBar.top;
  projectsIndicatorBar.style.top = indicatorBarStyles.projectsIndicatorBar.top;
  contactIndicatorBar.style.top = indicatorBarStyles.contactIndicatorBar.top;

  currentIndicatorEl.style.top = "1px";
}

// on scroll, changes the current section to indicate position in document
function setCurrentIndicatorStyle(newIndicator, newIndicatorBar) {
  // checks if null (like on initial load)
  if (currentIndicator) {
    currentIndicator.children[0].classList.remove("current-indicator");
    currentIndicatorBar.classList.remove("current-indicator-bar");
  }

  newIndicator.children[0].classList.add("current-indicator");
  newIndicatorBar.classList.add("current-indicator-bar");

  currentIndicator = newIndicator;
  currentIndicatorBar = newIndicatorBar;
}

//Helper methods
function pxToNumber(value) {
  return parseInt(value.substring(0, value.length - 2));
}

function calculatePositionIndicatorY(element) {
  const pageHeight = document.documentElement.scrollHeight;
  const elementHeight = element.offsetTop;
  const relativePos =
    (elementHeight / pageHeight) * positionIndicatorBar.offsetHeight;

  return relativePos - 2 * rem + "px";
}

function calculatePositionIndicatorHeight(element) {
  const relativeHeight =
    (element.offsetHeight / document.documentElement.scrollHeight) *
    positionIndicatorBar.offsetHeight;

  return relativeHeight + "px";
}

function scrollToAboutMe() {
  aboutMeSection.scrollIntoView({ block: "start", behavior: "smooth" });
}

function scrollToProjects() {
  projectsSection.scrollIntoView({ block: "start", behavior: "smooth" });
}

function scrollToContact() {
  contactSection.scrollIntoView({ block: "start", behavior: "smooth" });
}

function openResume() {
  window.location.assign("./resume.html");
}

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
  } else {
    menu.classList.add("showMenu");
  }
}

function closeMenu() {
  hamburger.children[0].checked = false;
}

// for scrolling down the page
function getVerticalOffsetTop(element) {
  const rect = element.getBoundingClientRect();
  return rect.top + window.scrollY - window.innerHeight;
}

// for scrolling up the page
function getVerticalOffsetBottom(element) {
  const rect = element.getBoundingClientRect();
  return rect.top + window.scrollY - 0.7 * window.innerHeight;
}

function setIndicatorContainerHeight() {
  containerHeight = container.offsetHeight;
}

// for calculating the screen size to appropriately position the scroll indicator elements
function calculateSizeAndPosition() {
  setViewportHeight();
  setContainerHeightandIndicatorPositions();
  setScrollIndicatorPositions();
}

function init() {
  setCurrentIndicatorStyle(homeIndicator, homeIndicatorBar);
  calculateSizeAndPosition();
  homeIndicator.children[0].classList.add("current-indicator");
  homeIndicatorBar.classList.add("current-indicator-bar");
}

init();
