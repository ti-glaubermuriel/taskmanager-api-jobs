<?php

class Task extends Illuminate\Database\Eloquent\Model {

    protected $table = "task";
    protected $guarded = array('id');
    public $timestamps = false;

}
