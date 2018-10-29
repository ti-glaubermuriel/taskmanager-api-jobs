<?php
use Illuminate\Database\Capsule\Manager as DB;
/**
* Método Middleware para checar a autenticação
*/
$authentication = function($app) {
  return function () use ($app) {
    $headers = $app->request->headers;
    $token_access = '123456';

    // verify token authetication
    if(empty($headers['task-token']) || $headers['task-token'] != $token_access){
      $app->status(401);
      echo json_encode(array('type' => 'error', 'message' => 'Unauthorized User'));
      $app->stop();
    }
  };
};
