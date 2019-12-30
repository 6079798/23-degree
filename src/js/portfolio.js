import Isotope from "isotope-layout";

import { switchActive } from "./helpers";

const portfolio = new Isotope(".portfolio__items", {
  itemSelector: ".portfolio__item"
});

const btnsContainer = document.querySelector("[data-filter-btns]");
const btns = btnsContainer.querySelectorAll("button");

btnsContainer.addEventListener("click", ({ target }) => {
  if (!target.matches("[data-filter]")) return;
  portfolio.arrange({ filter: target.dataset.filter });
  switchActive(btns, "portfolio__btn--active", target);
});
