<section class="cart">
  <div class="cart__wrapper">
    <h1>Корзина</h1>
    <ul class="cart__list">

    </ul>
    <span class="cart__total">Сумма 0 ₽</span>
  </div>
</section>
<section class="order">
  <div class="order__wrapper">
    <form class="order__form order__form--invalid" action="order" method="post" autocomplete="off">
      <legend>Пожалуйста, представьтесь</legend>
      <fieldset class="order__element">
        <input class="order__name" type="text" name="order-name" id="order-name" placeholder="Ваше имя" maxlength="50" data-pristine-required-message="Поле обязательно для заполнения" required>
      </fieldset>
      <fieldset class="order__element">
        <input class="order__phone" type="text" name="order-phone" id="order-phone" placeholder="Телефон" required data-pristine-required-message="Поле обязательно для заполнения">
      </fieldset>
      <fieldset class="order__element">
        <input type="email" name="order-email" id="order-email" placeholder="Email" required data-pristine-required-message="Поле обязательно для заполнения" data-pristine-email-message="Некорректно введён email">
      </fieldset>
      <button class="order__button" type="submit">Оформить заказ</button>
    </form>
  </div>
</section>
<template id="cart-item">
  <li class="cart__item">
    <img class="cart__item-image" src="img/product-1.png" width="125" height="150" alt="Изображение товара">
    <p class="cart__title"></p>
    <div class="cart__counter">
      <button class="cart__decrement"></button>
      <span class="cart__amount">1</span>
      <button class="cart__increment"></button>
    </div>
    <p class="cart__price">0 ₽</p>
    <button class="cart__delete"><span>Удалить</span></button>
  </li>
</template>