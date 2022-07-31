const orderForm = document.querySelector('.order__form');
const orderPhone = document.querySelector('.order__phone');

const validatePhoneLength = (value) => {
  return value.length >= 16;
};

if (orderForm) {
  const pristine = new Pristine(orderForm, {
    classTo: 'order__element',
    errorTextParent: 'order__element',
    errorTextClass: 'order__name-error-text',
  }, false);

  pristine.addValidator(orderPhone, validatePhoneLength, 'Введён некорректный номер', '1', false);


  orderForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
  });

  orderForm.addEventListener('input', (evt) => {


    const isValid = pristine.validate(true);

    if (isValid) {
      console.log('valid');
      orderForm.classList.remove('order__form--invalid');
    } else {
      console.log('ne valid');
      orderForm.classList.add('order__form--invalid');
    }
  })
}
