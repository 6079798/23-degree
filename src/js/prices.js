import noUiSlider from "nouislider";

import { switchActive } from "./helpers";

const optionsContainer = document.querySelector(".prices__options");
const optionsBtns = optionsContainer.querySelectorAll(".prices__option");
const areaSlider = document.querySelector(".prices__slider");
const areaValue = document.querySelector("[data-area]");
const priceValue = document.querySelector("[data-price]");
const totalValue = document.querySelector("[data-total]");

const getBasePrice = active => {
  if (active && active.dataset.base) {
    const price = +active.dataset.base;
    return !isNaN(price) ? price : 0;
  }
  return 0;
};

const getTotal = (price, area) => Math.floor(price * area);

const areaRange = {
  min: 100,
  "33.3333%": 10000,
  "66.6666%": 250000,
  max: 500000
};

const filterPips = value => {
  return Object.values(areaRange).filter(point => point === value).length
    ? 1
    : -1;
};

noUiSlider.create(areaSlider, {
  range: areaRange,
  start: 0,
  pips: {
    mode: "steps",
    filter: filterPips,
    format: {
      to: value => `${value.toLocaleString("ru")} м<sup>2</sup>`
    }
  }
});

let price = getBasePrice(document.querySelector(".prices__option--active"));
priceValue.innerHTML = `${price.toLocaleString("ru")} тг.`;

optionsContainer.addEventListener("click", ({ target }) => {
  if (!target.matches(".prices__option")) return;
  switchActive(optionsBtns, "prices__option--active", target);
  price = getBasePrice(target);
  priceValue.innerHTML = `${price.toLocaleString("ru")} тг.`;
  totalValue.innerHTML = `${getTotal(
    price,
    +areaSlider.noUiSlider.get()
  ).toLocaleString("ru")} тг.`;
});

areaSlider.noUiSlider.on("update", values => {
  areaValue.innerHTML = `${Math.floor(values).toLocaleString(
    "ru"
  )} м<sup>2</sup>`;
  totalValue.innerHTML = `${getTotal(price, values).toLocaleString("ru")} тг.`;
});

areaSlider.querySelectorAll(".noUi-value").forEach(el =>
  el.addEventListener("click", ({ target }) => {
    const value = Number(target.dataset.value);
    areaSlider.noUiSlider.set(value);
  })
);

const background = optionsContainer.querySelector(".prices__background");
const arrow = background.querySelector("span");
const paddingLeft = parseInt(getComputedStyle(optionsContainer).paddingLeft);
const paddingTop = parseInt(getComputedStyle(optionsContainer).paddingTop);

const handleEnter = ({ target }) => {
  target.classList.add("prices__option--enter");

  setTimeout(() => {
    target.matches(".prices__option--enter") &&
      target.classList.add("prices__option--enter-active");
  }, 150);

  background.classList.add("prices__background--open");

  const balloon = target.querySelector(".prices__balloon");
  const balloonPadding = parseInt(getComputedStyle(balloon).paddingLeft);
  const balloonCoords = balloon.getBoundingClientRect();
  const containerCoords = optionsContainer.getBoundingClientRect();
  const { left: targetLeft } = target.getBoundingClientRect();

  const coords = {
    height: balloonCoords.height,
    width: balloonCoords.width,
    top: balloonCoords.top - containerCoords.top - paddingTop,
    left: balloonCoords.left - containerCoords.left - paddingLeft
  };

  background.style.setProperty("width", `${coords.width}px`);
  background.style.setProperty("height", `${coords.height}px`);
  background.style.setProperty(
    "transform",
    `translate(${coords.left}px, ${coords.top}px)`
  );
  arrow.style.setProperty(
    "left",
    `${targetLeft -
      balloonCoords.left +
      target.clientWidth / 2 -
      balloonPadding / 2}px`
  );
};

const handleLeave = ({ target }) => {
  target.classList.remove("prices__option--enter");
  target.classList.remove("prices__option--enter-active");
  background.classList.remove("prices__background--open");
};

optionsBtns.forEach(btn => btn.addEventListener("mouseenter", handleEnter));
optionsBtns.forEach(btn => btn.addEventListener("mouseleave", handleLeave));
