<?php

require('utils.php');
require('config.php');

header('Content-Type: application/json');

$products = get_products_in_cart($con, $_POST['products']);

echo json_encode($products);

exit();

?>