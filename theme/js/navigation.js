// Navigation.js
// Prevent from click to often
var isClicked = false;
var isPopstate = false;

// Create class linkState to save for html history and fill it with dummy data
var linkState = { item: whichPageActive, url: window.location.href };

// If no history event defined do this
if (typeof history.replaceState !== "undefined") {
  // Fill the linkState class
  linkState.item = whichPageActive;
  linkState.url = window.location.href;

  // Create the history event
  history.replaceState(
    {
      item: linkState.item,
      url: linkState.url,
    },
    null,
    null
  );
}

// Set linkState (usually and update after internal link click)
function setLinkState(linkItem, menuUrl) {
  linkState.item = linkItem;
  linkState.url = menuUrl;
}

function doPushState(linkItem, menuUrl, poper) {
  var state = { item: linkItem, url: menuUrl },
    title = "",
    path = menuUrl;

  if (whichPageActive != linkItem) {
    animatePage(linkItem);
  } else {
    // A special function for the archives submenu, so that the menu itself is not reloaded
    if (pages[whichPageActive - 1] == "archives") {
      const query = document.querySelector(
        "#ajax_content_" + pages[linkItem - 1] + " .ajax-fade"
      );
      query.opacity = 0;
      query.transition = "all " + 100 + "ms";
    } else {
      const query = document.querySelector(
        "#page_" + pages[linkItem - 1] + " .ajax_content"
      );
      query.opacity = 0;
      query.transform = "translateZ(0)";
      query.transition = "all " + animationPageDuration + "ms";
    }

    fetch(path)
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        const parsed = new DOMParser().parseFromString(body, "text/html");
        document.querySelector("#page_" + pages[linkItem - 1]).innerHTML =
          parsed.querySelector(".ajaxHook").outerHTML;

        document.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightElement(block);
        });

        document.querySelectorAll("p code").forEach((block) => {
          hljs.highlightElement(block);
        });

        MathJax.Hub.Typeset();
        //$(window).scrollTop(0);
      });
  }

  // If a real link event, update history
  // In other words, if not popevent it is a real link
  if (poper == false) {
    history.pushState(state, null, path);
  }

  // Update linkState
  setLinkState(linkItem, menuUrl);
}

// If support for pushState exist
if (window.history && history.pushState) {
  // If click on menu link
  document.querySelector("#nav").addEventListener("click", (e) => {
    if (e.target && !!e.target.closest("A")) {
      const link = e.target.closest("A");

      // Prevent default action
      e.preventDefault();

      // If no nearby previous event has been fired
      if (isClicked == false) {
        // Create variables to save
        var linkItem = whichPageActive;
        for (var i = 1; i <= pages.length; i++) {
          if (link.title == pages[i - 1]) {
            linkItem = i;
          }
        }
        var menuUrl = link.attributes.href.nodeValue;

        // Perform the loading and update history
        doPushState(linkItem, menuUrl, false);

        // Change clicked event
        isClicked = true;

        // Set the timeout
        setTimeout(function () {
          isClicked = false;
        }, animationPageDuration);
      }
    }
  });

  // If click on link in main body
  document.querySelector("#main").addEventListener("click", (e) => {
    if (e.target && !!e.target.closest("A")) {
      const link = e.target.closest("A");
      if (link.target == "_blank") {
        // Do nothing for external links
      } else if (link.attributes.href.nodeValue[0] == "#") {
        // Do nothing for hash links
      } else {
        // Prevent default action if internal link
        e.preventDefault();

        // If no nearby previous event has been fired
        if (isClicked == false) {
          // Create variables to save
          var linkItem = whichPageActive;
          var menuUrl = link.attributes.href.nodeValue;

          // Perform the loading and update history
          doPushState(linkItem, menuUrl, false);

          // Change clicked event
          isClicked = true;

          // Set the timeout
          setTimeout(function () {
            isClicked = false;
          }, animationPageDuration);
        }
      }
    }
  });
}

// If a history event is fired
window.addEventListener("popstate", (e) => {
  // Get the previous state
  const state = e.state;

  if (!state) {
    // No previous state
  }
  // If no nearby previous event has been fired
  else if (isPopstate == false) {
    // Perform the loading and update history
    doPushState(state.item, state.url, true);

    // Change popstate so that no new event can be fired before a set time
    isPopstate = true;

    // Set the timeout
    popstateTimeout = setTimeout(function () {
      isPopstate = false;
    }, animationPageDuration);
  } else {
    // If the user browses very fast (too fast)

    // Change the popstate (not terribly important)
    isPopstate = false;

    // Clear timeout, run pushState again and cancel the new timeout too)
    clearTimeout(animationTimeout);
    doPushState(state.item, state.url, true);
    clearTimeout(animationTimeout);

    // These functions are in timeout and need to be run now when timeout is canceled
    document
      .querySelectorAll(hidePages)
      .forEach((el) => (el.style.display = "none"));
    document.querySelector("html").classList.remove("hide_scroll");
  }
});
// End Navigation.js
