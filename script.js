/* Automated Bytes - shared script
   Handles the three-way theme toggle (light / dark / contrast).
   Early theme application happens via an inline snippet in <head>
   on each page (see any HTML file) to avoid a flash of wrong theme;
   this file wires up the interactive control once the DOM is ready. */

(function () {
  "use strict";

  var STORAGE_KEY = "ab-theme";
  var THEMES = ["light", "dark", "contrast"];
  var LABELS = { light: "Light", dark: "Dark", contrast: "High contrast" };

  function getStoredTheme() {
    try {
      var t = localStorage.getItem(STORAGE_KEY);
      return THEMES.indexOf(t) > -1 ? t : null;
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* storage unavailable - theme still applies for this view */
    }
    var buttons = document.querySelectorAll("[data-theme-choice]");
    buttons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-theme-choice") === theme;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function buildToggle(container) {
    container.setAttribute("role", "group");
    container.setAttribute("aria-label", "Theme");
    THEMES.forEach(function (theme) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = LABELS[theme];
      btn.setAttribute("data-theme-choice", theme);
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", function () {
        applyTheme(theme);
      });
      container.appendChild(btn);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      buildToggle(toggle);
    }
    var current =
      document.documentElement.getAttribute("data-theme") ||
      getStoredTheme() ||
      "light";
    applyTheme(current);

    // Mark the current page in the nav for sighted + screen-reader users.
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav a, .footer-nav a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === here || (here === "" && href === "index.html")) {
        a.setAttribute("aria-current", "page");
      }
    });
  });
})();
