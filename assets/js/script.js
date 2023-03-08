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

const rem = parseInt(window.getComputedStyle(htmlElement).getPropertyValue("font-size"), 10);
let currentIndicator, currentIndicatorBar;

// setting padding for html element
htmlElement.style.padding = "20px";

// setting size of landing screen based on client screen size
let viewportHeight = window.innerHeight;
const htmlPadding = pxToNumber(htmlElement.style.padding);
headerSection.style.height = viewportHeight - htmlPadding + "px";

// position indicator logic
// on scroll, a check needs to be done to determine whether we're in a new section, and if so,
// that section's indicator becomes the current indicator and we change styles appropriately

// TODO
document.addEventListener("scroll", () => {
  if (window.scrollY >= getVerticalOffset(contactSection)) {
    setCurrentIndicatorStyle(contactIndicator, contactIndicatorBar);
  } else if (window.scrollY >= projectsSection.getBoundingClientRect().top) {
    setCurrentIndicatorStyle(projectsIndicator, projectsIndicatorBar);
  } else if (window.scrollY >= aboutMeSection.getBoundingClientRect().top) {
    setCurrentIndicatorStyle(aboutMeIndicator, aboutMeIndicatorBar);
  } else {
    setCurrentIndicatorStyle(homeIndicator, homeIndicatorBar);
  }

  // check whether contact is in view, if so, that is the current element
  // else check the vertical scroll position and whatever is mostly in view, that is the current index.
  // modify class list appropriately
});

// apply vertical positions to indicator links
let containerHeight = container.offsetHeight;
const indicatorStyles = {
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

const indicatorBarStyles = {
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
// set vertical positions for the position indicators and bars
homeIndicator.style.top = indicatorStyles.homeIndicator.top;
aboutMeIndicator.style.top = indicatorStyles.aboutMeIndicator.top;
projectsIndicator.style.top = indicatorStyles.projectsIndicator.top;
contactIndicator.style.top = indicatorStyles.contactIndicator.top;

homeIndicatorBar.style.top = indicatorBarStyles.homeIndicatorBar.top;
aboutMeIndicatorBar.style.top = indicatorBarStyles.aboutMeIndicatorBar.top;
projectsIndicatorBar.style.top = indicatorBarStyles.projectsIndicatorBar.top;
contactIndicatorBar.style.top = indicatorBarStyles.contactIndicatorBar.top;

currentIndicatorEl.style.top = "1px";

// on scroll, changes the current section to indicate position in document
function setCurrentIndicatorStyle(newIndicator, newIndicatorBar) {
  currentIndicator.children[0].classList.remove("current-indicator");
  currentIndicatorBar.classList.remove("current-indicator-bar");

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
  const relativePos = (elementHeight / pageHeight) * positionIndicatorBar.offsetHeight;

  return relativePos - 2 * rem + "px";
}

function calculatePositionIndicatorHeight(element) {
  const relativeHeight = (element.offsetHeight / document.documentElement.scrollHeight) * positionIndicatorBar.offsetHeight;

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

function getVerticalOffset(element) {
  const rect = element.getBoundingClientRect();
  return rect.top + window.scrollY - window.innerHeight;
}

function init() {
  currentIndicator = homeIndicator;
  currentIndicatorBar = homeIndicatorBar;
  homeIndicator.children[0].classList.add("current-indicator");
  homeIndicatorBar.classList.add("current-indicator-bar");
}

init();
