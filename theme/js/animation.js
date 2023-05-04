// Animation.js
// Set the transition time
const animationPageDuration = 250;
let animationTimeout;
let hidePages = [""];

// Set the z displacement
const zDisplacement = 100;

// Number of pages
const allPages = document.querySelectorAll("#main .page");

function setStyle(j, opacity, transform, transition) {
  allPages[j - 1].style.opacity = opacity;
  allPages[j - 1].style.transform = transform;
  allPages[j - 1].style.transition = transition;
}

// Function to animate the frame transitions
function animatePage(whichFrame) {
  document.querySelector("html").classList.add("hide_scroll");

  whichPageActive = whichFrame;

  let hideCounter = 0;
  let hide = [""];

  for (let j = 1; j <= allPages.length; j++) {
    if (whichFrame == j) {
      allPages[j - 1].style.display = "block";
      allPages[j - 1].style.opacity = 0;
      allPages[j - 1].style.zIndex = 0;

      setTimeout(() => {
        setStyle(
          j,
          1,
          "translateX(0) translateY(0) translateZ(0)",
          "all " + animationPageDuration + "ms"
        );
      }, 50);

      document
        .querySelectorAll("#nav ul li a")
        .forEach((e) => e.classList.remove("activeMenu"));
      document
        .querySelectorAll("#nav ul li:nth-child(" + (whichFrame + 1) + ") a")
        .forEach((e) => e.classList.add("activeMenu"));
    } else if (whichFrame > j) {
      setStyle(
        j,
        0,
        "translateX(0) translateY(0) translateZ(" +
          zDisplacement * (whichFrame - j) +
          "px)",
        "all " + animationPageDuration + "ms"
      );
      allPages[j - 1].style.zIndex = -whichFrame + j - 1;

      hide[hideCounter] = "#page_" + pages[j - 1];
      hideCounter++;
    } else {
      let opacityValue = (1 / (j - whichFrame)) * 0.1;
      setStyle(
        j,
        (1 / (j - whichFrame)) * 0.1,
        "translateX(0) translateY(0) translateZ(" +
          zDisplacement * (whichFrame - j) +
          "px)",
        "all " + animationPageDuration + "ms"
      );
      allPages[j - 1].style.zIndex = -(j - 1 + 1);

      hide[hideCounter] = "#page_" + pages[j - 1];
      hideCounter++;
    }
  }

  hidePages = hide.join(", ");

  animationTimeout = setTimeout(function () {
    document
      .querySelectorAll(hidePages)
      .forEach((e) => (e.style.display = "none"));
    document.querySelector("html").classList.remove("hide_scroll");
  }, animationPageDuration);
}
// End Animation.js
