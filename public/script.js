const sidebar = document.querySelector("#sidebar");
const menu = document.querySelector("#menu");
const backdrop = document.querySelector("#backdrop");
const closeMenu = document.querySelector(".close-menu");
const body = document.querySelector(".body");

menu.addEventListener("click", () => {
  sidebar.classList.remove("translate-x-full");
  sidebar.classList.add("transition-all");
  backdrop.classList.remove("hidden");
  disableScroll();
});

backdrop.addEventListener("click", () => {
  sidebar.classList.add("translate-x-full");
  sidebar.classList.add("transition-all");
  backdrop.classList.add("hidden");
  enableScroll();
});

closeMenu.addEventListener("click", () => {
  sidebar.classList.add("translate-x-full");
  sidebar.classList.add("transition-all");
  backdrop.classList.add("hidden");
  enableScroll();
});

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

function hideMenu() {
  if (!menu.classList.contains("hidden")) {
    sidebar.classList.add("translate-x-full");
    sidebar.classList.add("transition-all");
    backdrop.classList.add("hidden");
    enableScroll();
  }
}

