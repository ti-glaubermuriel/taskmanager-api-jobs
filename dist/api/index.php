<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'vendor/autoload.php';

$app = new \Slim\Slim();
$app->config(array(
  'debug' => true,
));

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;
$capsule->addConnection([
  'driver'    => 'pgsql',
  'host'      => 'localhost',
  'database'  => 'bdr_task',
  'username'  => 'postgres',
  'password'  => 'maritaca#2016@!',
  'charset'   => 'utf8',
  'collation' => 'utf8_general_ci',
  'prefix'    => '',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

// ROUTES
require 'routes/authentication.php';
require 'routes/task.php'; //api de integracao


$app->notFound(function () {
  echo json_encode(array(
    'status' => false,
    'mensagem' => 'Pagina nao encontrada!'
  ));
});

$app->run();
