const htmlElement = document.querySelector("html");
const headerSection = document.querySelector("header");
const headerGrid = document.getElementById("header-grid");
const navbarElement = document.querySelector("nav");
const aboutMeSection = document.getElementById("about-me");
const projectsSection = document.getElementById("projects");
const contactSection = document.getElementById("contact");
const aboutMeButton = document.getElementById("about-me-btn");
const projectsButton = document.getElementById("projects-btn");
const contactButton = document.getElementById("contact-btn");
const resumeButton = document.getElementById("resume-btn");
const positionIndicatorBar = document.getElementById("position-indicator");
const homeIndicator = document.getElementById("home-indicator");
const aboutMeIndicator = document.getElementById("about-me-indicator");
const projectsIndicator = document.getElementById("project-indicator");
const contactIndicator = document.getElementById("contact-indicator");
const positionIndicatorBlock = document.getElementById("position-indicator-block");

let currentIndicator = homeIndicator;

const rem = parseInt(window.getComputedStyle(htmlElement).getPropertyValue("font-size"), 10);
// setting padding for html element
htmlElement.style.padding = "20px";

// setting size of landing screen based on client screen size
let viewportHeight = window.innerHeight;
const htmlPadding = pxToNumber(htmlElement.style.padding);
headerSection.style.height = viewportHeight - htmlPadding + "px";

// event listeners for page navigation
homeIndicator.children[0].addEventListener("click", () => {
  window.scrollTo(0, 0);
});

aboutMeButton.addEventListener("click", scrollToAboutMe);
aboutMeIndicator.addEventListener("click", scrollToAboutMe);

projectsButton.addEventListener("click", scrollToProjects);
projectsIndicator.addEventListener("click", scrollToProjects);

contactButton.addEventListener("click", scrollToContact);
contactIndicator.addEventListener("click", scrollToContact);

resumeButton.addEventListener("click", openResume);

// position indicator logic
// new plan is to make each section an even height and look a lot like the template image.
// will need to use pseudo-elements (i think) for each div and move it to the left by 1rem.
// to get the section name in the middle of the line, will need to move it up by 50% of its height
// how do i draw a line in the way that is shown in the image with the white dots as markers for each new section?
homeIndicator.style.height = calculatePositionIndicatorHeight(headerSection);

aboutMeIndicator.style.top = calculatePositionIndicatorY(aboutMeSection);
aboutMeIndicator.style.height = calculatePositionIndicatorHeight(aboutMeSection);

projectsIndicator.style.top = calculatePositionIndicatorY(projectsSection);
projectsIndicator.style.height = calculatePositionIndicatorHeight(projectsSection);

contactIndicator.style.top = positionIndicatorBar.offsetHeight - htmlPadding + "px";
contactIndicator.style.height = calculatePositionIndicatorHeight(contactSection);

document.addEventListener("scroll", () => {
  // determines the relative position of the user's scroll on the page by calculating:
  // the current scroll position divided by the total height of the page less the height of the client's screen, then working that factor out relative to the scroll bar.
  blockPosition = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * positionIndicatorBar.offsetHeight;
  positionIndicatorBlock.style.top = blockPosition + "px";

  const newIndicator = checkBlockLocation(blockPosition);
  if (currentIndicator !== newIndicator) {
    currentIndicator.classList.remove("current-indicator");
    newIndicator.classList.add("current-indicator");
    currentIndicator = newIndicator;
  }
});

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

// called when scrolling to determine which positionBarIndicator section needs to be emphasised
function checkBlockLocation(position) {
  if (position < pxToNumber(aboutMeIndicator.style.top)) {
    return homeIndicator;
  } else if (position < pxToNumber(projectsIndicator.style.top)) {
    return aboutMeIndicator;
  } else if (position < pxToNumber(contactIndicator.style.top)) {
    return projectsIndicator;
  } else {
    return contactIndicator;
  }
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
