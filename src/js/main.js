import SmoothScroll from "smooth-scroll";
import { tns } from "tiny-slider/src/tiny-slider";

import "./polyfills";
import "./portfolio";
import "./clients";
import "./prices";
import "./forms";
import { debounce } from "./helpers";

const toTopTrigger = document.querySelector("[data-top-trigger]");
const toTopBtn = document.querySelector("[data-top]");

SmoothScroll("[data-scroll]", {
  updateURL: false,
  speedAsDuration: true
});

tns({
  container: ".team__slider",
  items: 1,
  nav: false,
  preventScrollOnTouch: "auto",
  cancelable: true,
  gutter: 40
});

const toggleToTopBtn = trigger => {
  const { top } = trigger.getBoundingClientRect();
  if (top <= window.innerHeight) {
    toTopBtn.classList.add("scroll-top--shown");
  } else toTopBtn.classList.remove("scroll-top--shown");
};

window.addEventListener(
  "scroll",
  debounce(() => {
    toggleToTopBtn(toTopTrigger);
  }),
  false
);
