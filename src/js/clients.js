import noUiSlider from "nouislider";

const clientsSlider = document.querySelector(".clients__slider");
const clientsContainer = document.querySelector(".clients__list");
const clients = clientsContainer.querySelector(".clients__logos");

window.addEventListener("load", () => {
  const max = clients.scrollWidth - clientsContainer.clientWidth;
  if (max > 0) {
    noUiSlider.create(clientsSlider, {
      start: 0,
      step: 20,
      range: {
        min: 0,
        max
      }
    });
    clientsSlider.noUiSlider.on("update", values => {
      clients.style.transform = `translateX(-${values}px)`;
    });
  }
});
