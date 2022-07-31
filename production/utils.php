<?php

use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;

function include_template($name, array $data = []) {
    $name = 'templates/' . $name;
    $result = '';

    if (!is_readable($name)) {
        return $result;
    }

    ob_start();
    extract($data);
    require $name;

    $result = ob_get_clean();

    return $result;
}

function get_all_products($db) {
    $result_content = mysqli_query($db, "SELECT * FROM products");
    return $rows_content = mysqli_fetch_all($result_content, MYSQLI_ASSOC);
}

function get_products_in_cart($db, $products) {
    $stmt = $db->stmt_init();
    $stmt->prepare("SELECT * FROM products WHERE id IN ($products)");
    $stmt->execute();
    $result = $stmt->get_result();
    return $rows_content = mysqli_fetch_all($result, MYSQLI_ASSOC);
}

function send_mail($to, $title_content, $text_content) {
    $message = new Email();
    $message->to($to);
    $message->from('gladoratorx@yandex.com');
    $message->subject($title_content);
    $message->text($text_content);

    $dsn = 'smtp://gladoratorx@yandex.ru:токен@smtp.yandex.ru:465?encryption=tls&auth_mode=login';
    $transport = Transport::fromDsn($dsn);

    $mailer = new Mailer($transport);
    $mailer->send($message);
}
