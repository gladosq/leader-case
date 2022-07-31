const productButtons = document.querySelectorAll('.catalog__item button');
const productsCartCounter = document.querySelector('.header__cart-count');
const catalogItems = document.querySelectorAll('.catalog__item');
const headerCartButton = document.querySelector('.header__cart');

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
