const productButtons = document.querySelectorAll('.catalog__item button');
const productsCartCounter = document.querySelector('.header__cart-count');
const catalogItems = document.querySelectorAll('.catalog__item');
const headerCartButton = document.querySelector('.header__cart');

const productsCartUrl = 'products-in-cart.php';

let productsInCart;

if (localStorage.getItem('products') === null || localStorage.getItem('products').length === 0) {
  productsInCart = [];
  headerCartButton.classList.add('header__cart--inactive');
} else {
  productsInCart = localStorage.getItem('products').split(',');
  productsCartCounter.classList.add('header__cart-count--active');
  productsCartCounter.textContent = productsInCart.length;
  headerCartButton.classList.remove('header__cart--inactive');
}

const checkProductsInCart = () => {
  catalogItems.forEach((item) => {
    const productId = item.getAttribute('data-id');

    if (productsInCart != undefined && productsInCart.includes(productId)) {
      item.classList.add('catalog__item--active');
      item.querySelector('button').textContent = 'В корзине';
    }
  })
};

checkProductsInCart();

productButtons.forEach((item) => {
  item.addEventListener('click', () => {
    item.parentNode.classList.toggle('catalog__item--active');
    item.textContent = item.parentNode.classList.contains('catalog__item--active') ? 'В корзине' : 'Добавить в корзину';

    const currentId = item.parentNode.getAttribute('data-id');

    if (productsInCart.includes(currentId)) {
      productsInCart.splice(productsInCart.indexOf(currentId), 1);

      if (productsInCart.length === 0) {
        productsCartCounter.classList.remove('header__cart-count--active');
        headerCartButton.classList.add('header__cart--inactive');

      }
    } else {
      productsInCart.push(currentId);
      productsCartCounter.classList.add('header__cart-count--active');
      headerCartButton.classList.remove('header__cart--inactive');
    }

    productsCartCounter.textContent = productsInCart.length;
    localStorage.setItem('products', productsInCart);
  })
})

const calcPriceSum = () => {
  const prices = document.querySelectorAll('.cart__price');
  let sum = 0;
  prices.forEach((item) => sum = sum + formatNumber(item));

  return sum;
}

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
    cartItem.setAttribute('data-id', `${item.id}`);

    productListContainer.append(cartItem);

    const incrementButton = cartItem.querySelector('.cart__increment');
    const decrementButton = cartItem.querySelector('.cart__decrement');
    const deleteButton = cartItem.querySelector('.cart__delete');
    const priceContainer = cartItem.querySelector('.cart__price');
    const amount = cartItem.querySelector('.cart__amount');

    const priceForOne = formatNumber(priceContainer);

    let calcAmount = 1;

    totalPrice.textContent = `Сумма ${calcPriceSum()} ₽`;

    incrementButton.addEventListener('click', () => {
      if (calcAmount >= MIN_AMOUNT && calcAmount <= (MAX_AMOUNT - 1)) {
        calcAmount++;

        amount.textContent = calcAmount;
        priceContainer.textContent = `${priceForOne * calcAmount} ₽`;
        totalPrice.textContent = `Сумма ${calcPriceSum()} ₽`;
      }
    });

    decrementButton.addEventListener('click', () => {
      if (calcAmount >= (MIN_AMOUNT + 1) && calcAmount <= MAX_AMOUNT) {
        calcAmount--;

        amount.textContent = calcAmount;
        priceContainer.textContent = `${priceForOne * calcAmount} ₽`;
        totalPrice.textContent = `Сумма ${calcPriceSum()} ₽`;
      }
    });

    deleteButton.addEventListener('click', (evt) => {
      const currentId = evt.target.parentNode.getAttribute('data-id');

      if (productsInCart.includes(currentId)) {
        productsInCart.splice(productsInCart.indexOf(currentId), 1);

        if (productsInCart.length === 0) {
          productsCartCounter.classList.remove('header__cart-count--active');
          headerCartButton.classList.add('header__cart--inactive');

        }
      } else {
        productsInCart.push(currentId);
        productsCartCounter.classList.add('header__cart-count--active');
        headerCartButton.classList.remove('header__cart--inactive');
      }

      localStorage.setItem('products', productsInCart);
      productsCartCounter.textContent = productsInCart.length;
      evt.target.parentNode.remove();

      totalPrice.textContent = `Сумма ${calcPriceSum()} ₽`;

      if (localStorage.getItem('products') === null || localStorage.getItem('products').length === 0) {
        window.location = '/';
      }
    })
  })
};

const formatNumber = (string) => Number(string.textContent.split(' ')[0]);

let formData = new FormData();
formData.append('products', productsInCart.join(','))

const makeRequest = (url, onSuccess, body) => {
  fetch(url, {
    method: 'post',
    body: body,
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    onSuccess(data);
  })["catch"](function (error) {
    console.error('Error:', error);
  });
};

if (productListContainer && productsInCart.length != 0) {
  makeRequest(productsCartUrl, createElements, formData);
} else if (productListContainer) {
  window.location = '/';
}

export {makeRequest};