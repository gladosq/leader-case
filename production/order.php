<?php

require 'vendor/autoload.php';

require_once 'utils.php';

use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;

header('Content-Type: application/json');

$random_number = rand(1, 999999);

if ($_POST) {
	$title_content = 'Тестовое задание, заказ №' . rand(1, 999999);
    $address = 'gladosq@gmail.com';
    $text_content = htmlspecialchars($_POST['order-name']) . ' заказ №' . $random_number . ' сформирован. В ближайшее время наш специалист свяжется с вами по телефону' . htmlspecialchars($_POST['order-phone']);

    send_mail($address, $title_content, $text_content);
}

$_POST['rand'] = $random_number;

echo json_encode($_POST);

exit();

?>