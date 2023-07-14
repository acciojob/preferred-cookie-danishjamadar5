//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
  const preferencesForm = document.getElementById("preferencesForm");
  const fontSizeInput = document.getElementById("fontsize");
  const fontColorInput = document.getElementById("fontcolor");

  // Load preferences from cookies if available
  loadPreferencesFromCookies();

  // Handle form submission
  preferencesForm.addEventListener("submit", function (event) {
    event.preventDefault();
    savePreferencesToCookies();
    applyPreferences();
  });

  function loadPreferencesFromCookies() {
    const fontSize = getCookie("fontSize");
    const fontColor = getCookie("fontColor");

    if (fontSize && fontColor) {
      fontSizeInput.value = fontSize;
      fontColorInput.value = fontColor;
    }
  }

  function savePreferencesToCookies() {
    const fontSize = fontSizeInput.value;
    const fontColor = fontColorInput.value;

    setCookie("fontSize", fontSize);
    setCookie("fontColor", fontColor);
  }

  function applyPreferences() {
    const fontSize = fontSizeInput.value + "px";
    const fontColor = fontColorInput.value;

    document.documentElement.style.setProperty("--fontsize", fontSize);
    document.documentElement.style.setProperty("--fontcolor", fontColor);
  }

  // Utility functions for handling cookies
  function setCookie(name, value, days = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
  }

  function getCookie(name) {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }
});
