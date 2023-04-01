// Animation.js
// Set the transition time
const animationPageDuration = 250;
var animationTimeout;
var hidePages = [""];

// Set the z displacement
const zDisplacement = 100;

// Number of pages
const allPages = document.querySelectorAll("#main .page");

// Function to animate the frame transitions
function animatePage(whichFrame) {
  const html = document.querySelector("html");
  html.classList.add("hide_scroll");

  whichPageActive = whichFrame;

  let hideCounter = 0;
  let hide = [""];

  for (let j = 1; j <= allPages.length; j++) {
    if (whichFrame == j) {
      allPages[j - 1].style.display = "block";
      allPages[j - 1].style.zIndex = 0;

      $("#page_" + pages[j - 1])
        .delay(0)
        .queue(function (next) {
          $(this).css({
            opacity: 1,
            transform: "translateX(0) translateY(0) translateZ(0)",
            transition: "all " + animationPageDuration + "ms",
          });
          next();
        });

      const navUlLiA = document.querySelectorAll("#nav ul li a");
      navUlLiA.forEach((e) => e.classList.remove("activeMenu"));
      const navUlLinth = document.querySelectorAll(
        "#nav ul li:nth-child(" + (whichFrame + 1) + ") a"
      );
      navUlLinth.forEach((e) => e.classList.add("activeMenu"));
    } else if (whichFrame > j) {
      all_pages[j - 1].style.opcaity = 0;
      all_pages[j - 1].style.transform =
        "translateX(0) translateY(0) translateZ(" +
        zDisplacement * (whichFrame - j) +
        "px)";
      all_pages[j - 1].style.transition = "all " + animationPageDuration + "ms";
      all_pages[j - 1].style.zIndex = -whichFrame + j - 1;

      hide[hideCounter] = "#page_" + pages[j - 1];
      hideCounter++;
    } else {
      let opacityValue = (1 / (j - whichFrame)) * 0.1;
      if (document.querySelectorAll("#main .page:nth-child(" + j + "):visible").length == 0) {
        all_pages[j - 1].style.opacity = opacityValue;
        all_pages[j - 1].style.transform = "translateX(0) translateY(0) translateZ(" +
            zDisplacement * (whichFrame - j) +
            "px)";
          all_pages[j - 1].style.transition = "all " + animationPageDuration + "ms";
      } else {
        all_pages[j - 1].style.opacity = opacityValue;
        all_pages[j - 1].style.transform = "translateX(0) translateY(0) translateZ(" +
            zDisplacement * (whichFrame - j) +
            "px)";
        all_pages[j - 1].style.transition = "all " + animationPageDuration + "ms";
      }

      all_pages[j - 1].style.zIndex = -(j - 1 + 1);

      hide[hideCounter] = "#page_" + pages[j - 1];
      hideCounter++;
    }
  }

  hidePages = hide.join(", ");

  animationTimeout = setTimeout(function () {
    document.querySelectorAll(hidePages).forEach((e) => e.style.display = "none" );
    document.querySelector("html").classList.remove("hide_scroll");
  }, animationPageDuration);
}
// End Animation.js
