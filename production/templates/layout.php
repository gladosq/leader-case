<!DOCTYPE html>
<html class="page" lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Aquacase">
  <meta name="keywords" content="Aquacase">
  <title>ЛидерПоиска</title>
  <link rel="preload" href="fonts/montserrat-500.woff" as="font" crossorigin="anonymous">
  <link rel="preload" href="fonts/montserrat-600.woff" as="font" crossorigin="anonymous">
  <link rel="preload" href="fonts/montserrat-700.woff" as="font" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="css/styles.min.css">
</head>
<body class="page-body">

  <?= isset($header) ? $header : ''; ?>

  <main class="main">

    <?= isset($content) ? $content : ''; ?>

    <section class="modal-success hidden">
      <div class="modal-success__wrapper">
        <p class="modal-success__title">Спасибо Татьяна, ваш заказ №165796 оформлен.</p>
        <p class="modal-success__caption">В ближайшее время мы свяжемся с вами по телефону +7 (999) 999 - 99 - 99 для его подтверждения.</p>
        <button class="modal-success__close-button"></button>
      </div>
    </section>
    <section class="overlay hidden"></section>
  </main>
  <footer class="footer" id="footer">
    <div class="footer__wrapper">
      <p>Тестовое задание на должность младшего программиста «Лидера поиска», ver. 3.0</p>
    </div>
  </footer>
  <script src="js/imask.js"></script>
  <script src="js/pristine.js"></script>
  <script src="js/main.js" type="module"></script>
</body>
</html>
