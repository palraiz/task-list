<?php


$data = '';
if (isset($_POST['data']) && $_POST['data'] != '') {
    $data = $_POST['data'];

}





echo json_encode(['title'=>$data,'check'=>'false']);