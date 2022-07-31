const productListContainer = document.querySelector('.cart__list');
const totalPrice = document.querySelector('.cart__total');

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 10;

const createElements = (data) => {
  data.forEach((item) => {
    const cartItemTemplate = document.querySelector('#cart-item').content.querySelector('.cart__item');
    const cartItem = cartItemTemplate.cloneNode(true);

    cartItem.querySelector('.cart__item-image').src = `${item.image}`;
    cartItem.querySelector('.cart__title').textContent = `${item.title}`;
    cartItem.querySelector('.cart__price').textContent = `${item.price} ₽`;

    productListContainer.append(cartItem);
  })
};

const formatNumber = (string) => Number(string.textContent.split(' ')[0]);

const calcPriceSum = () => {
  const prices = document.querySelectorAll('.cart__price');
  let sum = 0;
  prices.forEach((item) => sum = sum + formatNumber(item));

  return sum;
}

const cartItems = document.querySelectorAll('.cart__item');
if (cartItems.length != 0) {
  totalPrice.textContent = `Сумма ${calcPriceSum()} ₽`;
}

cartItems.forEach((item) => {
  const incrementButton = item.querySelector('.cart__increment');
  const decrementButton = item.querySelector('.cart__decrement');
  const priceContainer = item.querySelector('.cart__price');
  const amount = item.querySelector('.cart__amount');

  const priceForOne = formatNumber(priceContainer);

  let calcAmount = 1;

  incrementButton.addEventListener('click', function () {
    if (calcAmount >= MIN_AMOUNT && calcAmount <= (MAX_AMOUNT - 1)) {
      calcAmount++;

      amount.textContent = calcAmount;
      priceContainer.textContent = `${priceForOne * calcAmount} ₽`;
      totalPrice.textContent = `Сумма ${calcPriceSum()} ₽`;
    }
  })

  decrementButton.addEventListener('click', function () {
    if (calcAmount >= (MIN_AMOUNT + 1) && calcAmount <= MAX_AMOUNT) {
      calcAmount--;

      amount.textContent = calcAmount;
      priceContainer.textContent = `${priceForOne * calcAmount} ₽`;
      totalPrice.textContent = `Сумма ${calcPriceSum()} ₽`;
    }
  })
})
