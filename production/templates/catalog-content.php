<section class="catalog">
  <div class="catalog__wrapper">
    <h1>Каталог товаров</h1>
    <ul class="catalog__list">
      <?php if (isset($products)): ?>
        <?php foreach ($products as $product): ?>
          <li class="catalog__item" data-id="<?= $product['id']; ?>">
            <img src="<?= $product['image']; ?>" alt="Изображение товара">
            <p><?= $product['title']; ?></p>
            <span><?= $product['price']; ?> ₽</span>
            <button>Добавить в корзину</button>
          </li>
        <?php endforeach; ?>
      <?php endif; ?>
    </ul>
  </div>
</section>