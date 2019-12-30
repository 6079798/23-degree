import Pristine from "pristinejs/dist/pristine.min.js";
import Toastify from "toastify-js";

Pristine.addValidator(
  "phone",
  value => /^((\+7|7|8)+([0-9]){10})$/g.test(value.trim()),
  "Некорректный номер",
  2,
  false
);

Pristine.addValidator(
  "name",
  value =>
    /^[a-zA-Zа-яА-Я]+(([',. -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/gi.test(
      value.trim()
    ),
  "Некорректное имя",
  2,
  false
);

Pristine.addValidator(
  "email",
  value => /\S+@\S+\.\S+/gi.test(value.trim()),
  "Некорректный email",
  2,
  false
);

const validatorConfig = {
  classTo: "form__group",
  errorTextParent: "form__group",
  errorClass: "form__group--danger",
  successClass: "form__group--success",
  errorTextTag: "span",
  errorTextClass: "form__error"
};

let validator;

const doSubmit = event => {
  event.preventDefault();
  const { target: form } = event;
  validator = new Pristine(form, validatorConfig);
  const isValid = validator.validate();
  if (isValid) {
    const btn = form.querySelector("button[type=submit]");
    const data = new FormData(form);
    const req = new XMLHttpRequest();
    const url = "https://echo.htmlacademy.ru";
    req.open("POST", url, true);
    req.send(data);
    req.onreadystatechange = function() {
      if (req.readyState !== 4) return;
      if (req.status !== 200) {
        renderError();
      } else {
        console.log(req.responseText);
        renderSuccess(form);
        validator.destroy();
        form.reset();
        btn.disabled = false;
      }
    };
    btn.disabled = true;
  }
};

const renderSuccess = () => {
  Toastify({
    text: "Спасибо! Мы свяжемся с вами в ближайшее время!",
    duration: 5000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    className: "toastify--success"
  }).showToast();
};

const renderError = () => {
  Toastify({
    text: "Ошибка! Попробуйте позже!",
    duration: 5000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    className: "toastify--error"
  }).showToast();
};

document.addEventListener("submit", doSubmit);
