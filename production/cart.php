<?php

require('utils.php');

$header_content = include_template('header-content.php', []);
$cart_content = include_template('cart-content.php', []);
$layout_content = include_template('layout.php', ['content' => $cart_content, 'header' => $header_content]);
print($layout_content);