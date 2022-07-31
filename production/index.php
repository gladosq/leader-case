<?php

require('utils.php');
require('config.php');

$products = get_all_products($con);

$header_content = include_template('header-content.php', []);
$catalog_content = include_template('catalog-content.php', ['products' => $products]);
$layout_content = include_template('layout.php', ['content' => $catalog_content, 'header' => $header_content]);
print($layout_content);