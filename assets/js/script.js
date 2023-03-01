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

const rem = parseInt(window.getComputedStyle(htmlElement).getPropertyValue("font-size"), 10);
console.log(rem);
// setting padding for html element
htmlElement.style.padding = "20px";

// setting size of landing screen based on client screen size
let viewportHeight = window.innerHeight;
const htmlPadding = parseInt(htmlElement.style.padding.substring(0, htmlElement.style.padding.length - 2));
headerSection.style.height = viewportHeight - htmlPadding + "px";

// set height for landing page grid
headerGrid.style.height = header.offsetHeight - navbarElement.offsetHeight - htmlPadding + "px";

// set height to minimum of full page for each section
// aboutMeSection.style.minHeight = viewportHeight + "px";
projectsSection.style.minHeight = viewportHeight + "px";

// make navbar visible when navigation buttons are out of view
// const buttonY = resumeButton.getBoundingClientRect().y;
// document.addEventListener("scroll", (e) => {
//   if (scrollY > buttonY) {
//     navbarElement.style.visibility = "visible";
//   } else {
//     navbarElement.style.visibility = "hidden";
//   }
// });

// event listeners for page navigation
homeIndicator.children[0].addEventListener("click", () => {
  window.scrollTo(0, 0);
});
aboutMeButton.addEventListener("click", scrollToAboutMe);
aboutMeIndicator.addEventListener("click", scrollToAboutMe);
projectsButton.addEventListener("click", scrollToProjects);
projectsIndicator.addEventListener("click", scrollToProjects);
contactButton.addEventListener("click", scrollToContact);
resumeButton.addEventListener("click", openResume);

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

// position indicator logic
aboutMeIndicator.style.top = calculatePositionIndicatorY(aboutMeSection) - 5 * rem + "px";
projectsIndicator.style.top = calculatePositionIndicatorY(projectsSection) - 5 * rem + "px";
contactIndicator.style.top = positionIndicatorBar.offsetHeight - htmlPadding + "px";

function calculatePositionIndicatorY(element) {
  const pageHeight = document.documentElement.scrollHeight;
  console.log("page height " + pageHeight);
  const elementHeight = element.offsetHeight;
  console.log("elementHeight " + elementHeight);

  return (elementHeight / pageHeight) * positionIndicatorBar.offsetHeight;
}
