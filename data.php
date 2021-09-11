<?php

$action = '';

if (isset($_GET['action']) && $_GET['action'] != '')
    $action = $_GET['action'];

    $connect = mysqli_connect("localhost", "root","root", "task-list");
    mysqli_set_charset($connect, "utf8");
    if (mysqli_connect_error()) echo json_encode(['Connect to MySQL:' => 'ERROR']);

if ($action=='getAll'){

}

if ($action=='clearAll'){

}

if ($action == 'addNewTask'){
    if (isset($_POST['data']) && $_POST['data'] != '') {
        $data = $_POST['data'];
        $query = "INSERT INTO tasks (title) VALUES ($data);";
        $result = mysqli_query($connect, $query);

        echo json_encode(['Title' => $data]);
    }

}

if ($action == 'checkedTask'){
    if (isset($_POST['data']) && $_POST['data'] != '') {
        $data = $_POST['data'];
        $query = "";
        $result = mysqli_query($connect, $query);

        echo json_encode(['Checked' => 'OK']);
    }

}

if ($action == 'deletTask'){
    if (isset($_POST['data']) && $_POST['data'] != '') {
        $data = $_POST['data'];
        $query = "";
        $result = mysqli_query($connect, $query);

        echo json_encode(['Delet' => 'OK']);
    }

}

if ($action == 'redelTask') {
    if (isset($_POST['data']) && $_POST['data'] != '') {
        $data = $_POST['data'];
        $query = "";
        $result = mysqli_query($connect, $query);

        echo json_encode(['Delet' => 'OK']);
    }

}