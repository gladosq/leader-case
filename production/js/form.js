import {makeRequest} from './adding-product.js';

const orderForm = document.querySelector('.order__form');
const orderPhone = document.querySelector('.order__phone');
const overlay = document.querySelector('.overlay');
const modalSuccess = document.querySelector('.modal-success');
const modalCloseButton = document.querySelector('.modal-success__close-button');

const mailerUrl = 'order.php';

const validatePhoneLength = (value) => {
  return value.length >= 16;
};

const showSuccessModal = (data) => {
  document.querySelector('.modal-success__title').innerHTML = `Спасибо <span>${data['order-name']}</span>, ваш заказ <span>№${data['rand']}</span> оформлен`
  document.querySelector('.modal-success__caption').innerHTML = `В ближайшее время мы свяжемся с вами по телефону <span>${data['order-phone']}</span> для его подтверждения.`
  modalSuccess.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.body.classList.add('no-scroll');
}

const hideSuccessModal = () => {
  window.location = '/';
}

if (orderForm) {
  const pristine = new Pristine(orderForm, {
    classTo: 'order__element',
    errorTextParent: 'order__element',
    errorTextClass: 'order__name-error-text',
  }, true);

  pristine.addValidator(orderPhone, validatePhoneLength, 'Введён некорректный номер', '1', false);


  orderForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      let formData = new FormData(orderForm);

      makeRequest(mailerUrl, showSuccessModal, formData);

      window.addEventListener('keydown', hideModalHandler);
      modalCloseButton.addEventListener('click', hideModalHandler);
      overlay.addEventListener('click', hideModalHandler);
    }
  });

  orderForm.addEventListener('input', () => {
    const isValid = pristine.validate(true);

    if (isValid) {
      orderForm.classList.remove('order__form--invalid');
    } else {
      orderForm.classList.add('order__form--invalid');
    }
  })
}

function hideModalHandler(evt) {
  if (evt.type === 'keydown' && evt.key !== 'Escape') {
    return;
  }

  window.removeEventListener('keydown', hideModalHandler);
  modalCloseButton.removeEventListener('click', hideModalHandler);
  overlay.removeEventListener('click', hideModalHandler);

  hideSuccessModal();
}

