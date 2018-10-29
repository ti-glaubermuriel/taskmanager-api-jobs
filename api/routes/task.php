<?php

/**
* Routes task 
*/
$app->group('/task', function () use ($app, $authentication) {
  
  /**
  * List all task
  */
  $app->get('/list', $authentication($app), function () use ($app) {
    try {

      echo Task::orderBy('id', 'ASC')->get()->toJson();

    } catch (Exception $e) {
      echo json_encode(array(
        'message' => $e->getMessage(),
      ));
    }

  });


  /**
  * Get details of the id find task
  */
  $app->get('/get/:id', $authentication($app), function ($id) use ($app) {

    try {

      echo Task::where('id', '=', $id)->get()->first()->toJson();

    } catch (Exception $e) {
      echo json_encode(array(
        'message' => 'Error list all task(s), please try again later!',
      ));
    }

  });

  /**
  * Save new task
  */
  $app->post('/save', $authentication($app), function () use ($app) {
    $post = json_decode($app->request()->getBody(), true);


    try {
      $task = new Task;
      $task->fill($post);
      $task->save();

      if ($task->id) {
        $type = 'success';
        $message = 'New task saved successfully!';
        $id = $task->id;
      }
      else{
        $type = 'warning';
        $message = 'New task error, please try again later!';
        $id = '';
      }

    } catch (Exception $e) {
      $type = 'error';
      $message = 'Exception -> ' . $e->getMessage();
      $id = '';
    }

    echo json_encode(array(
      'type' => $type,
      'message' => $message,
      'id' => $id
    ));

  });

  /**
  * Edit task
  */
  $app->put('/edit/:id', $authentication($app), function ($id) use ($app) {
    $post = json_decode($app->request()->getBody(), true);

    try {
      $task = Task::find($id);
      $task->fill($post);

      if ($task->save()) {
        $type = 'success';
        $message = 'Task altered successfully!';
      }
      else{
        $type = 'warning';
        $message = 'Change task error, please try again later!';
      }

    } catch (Exception $e) {
      $type = 'error';
      $message = 'Exception -> ' . $e->getMessage();
    }

    echo json_encode(array(
      'type' => $type,
      'message' => $message
    ));

  });

  /**
  * Delete task
  */
  $app->delete('/delete/:id', $authentication($app), function ($id) use ($app) {
    try {
       $task = Task::find($id);

        if ($task->delete()) {
            $type = 'success';
            $message = 'Task deleted successfully!';
        } else {
            $type = 'warning';
            $message = 'Delete task error, please try again later!';
        }
    } catch (Exception $e) {
        $type = 'error';
        $message = 'Exception -> ' . $e->getMessage();
    }

    echo json_encode(array(
        'type' => $type,
        'message' => $message
    ));
  });

});
