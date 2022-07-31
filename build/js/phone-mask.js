const phoneInput = document.querySelector('.order__phone');

if (phoneInput) {
  const maskOptions = {
    mask: '+{7}(000)000-00-00'
  };

  const mask = IMask(phoneInput, maskOptions);
}
