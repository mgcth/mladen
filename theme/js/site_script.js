// Utils
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// If Javascript enabled do some main navigation magic
function fadeInNav() {
  document.querySelectorAll("#nav li a").forEach((e) => {
    e.style.display = "flex";
    e.style.opacity = 0;
  });

  navTimeIn = setTimeout(() => {
    // Delay (0) to separate display transition
    let navTime = 100;
    document.querySelectorAll("#nav li").forEach((e, index) => {
      if (index < 1) return;
      e.children.item("a").style.opacity = 1;
      e.children.item("a").style.transition = "opacity " + navTime + "ms";
      navTime = navTime + 100;
    });
  }, 10);

  navOnMyWayOut = true;
}

function fadeOutNav() {
  let navTime = 600;
  document.querySelectorAll("#nav li").forEach((e, index) => {
    if (index < 1) return;
    e.children.item("a").style.opacity = 0;
    e.children.item("a").style.transition = "opacity " + navTime + "ms";
    navTime = navTime - 100;
  });

  navTimeout = setTimeout(() => {
    document.querySelectorAll("#nav li a").forEach((e) => {
      e.style.display = "none";
    });
    navKillTimeout = false;
  }, 600);

  navOnMyWayOut = false;
  navKillTimeout = true;
}

let navTimeout = 0;
let navOnMyWayOut = false;
let navKillTimeout = false;

document.querySelector("nav #menu-icon").addEventListener("click", (e) => {
  if (navOnMyWayOut == false) {
    if (navKillTimeout == false) {
      fadeInNav();
    } else {
      clearTimeout(navTimeout);
      fadeInNav();
      navKillTimeout = false;
    }
  } else {
    fadeOutNav();
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("#nav")) {
    fadeOutNav();
  }
});
