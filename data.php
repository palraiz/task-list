<?php


$connect = mysqli_connect("localhost", "root","root", "task-list");
mysqli_set_charset($connect, "utf8");
if (mysqli_connect_error()) echo json_encode(['Connect to MySQL:' => 'ERROR']);



$action = '';
if (isset($_GET['action']) && $_GET['action'] != '')
    $action = $_GET['action'];

if ($action=='getAll'){
    $query = "SELECT * FROM tasks;";
    $result = mysqli_query($connect, $query);
    $count = mysqli_num_rows($result);

    if ($count) {
        while ($row = mysqli_fetch_array($result)){
            $tasks[] = $row;
        }}

    echo json_encode([$tasks]);
}

if ($action=='clearAll'){
    $query = "TRUNCATE TABLE tasks;";
    $result = mysqli_query($connect, $query);
}



if ($action == 'addNewTask'){
    if (isset($_POST['data']) && $_POST['data'] != '') {
        $data = $_POST['data'];
        $query = "INSERT INTO tasks(title) VALUES ('$data') ;";
        $result = mysqli_query($connect, $query);

        $query = "SELECT id FROM tasks ORDER BY id DESC;";
        $result = mysqli_query($connect, $query);

        $id = mysqli_fetch_array($result);
        echo json_encode([$id]);
    }}

if ($action == 'checkedTask'){
    if (isset($_POST['data']) && $_POST['data'] != '') {
        $data = $_POST['data'];
        $query = "SELECT checked FROM tasks WHERE id = $data;";
        $result = mysqli_query($connect, $query);
        $result = mysqli_fetch_array($result);

        if ($result['checked'] == 0) $query = "UPDATE tasks SET checked ='1' WHERE id = $data";
        else $query = "UPDATE tasks SET checked ='0' WHERE id = $data";

        $result = mysqli_query($connect, $query);
        echo json_encode(['Checked' => 'OK']);
    }}

if ($action == 'deletTask'){
    if (isset($_POST['data']) && $_POST['data'] != '') {
        $data = $_POST['data'];
        $query = "SELECT delet FROM tasks WHERE id = $data;";
        $result = mysqli_query($connect, $query);
        $result = mysqli_fetch_array($result);

        if ($result['delet'] == 0) $query = "UPDATE tasks SET delet ='1' WHERE id = $data";
        else $query = "UPDATE tasks SET delet ='0' WHERE id = $data";

        $result = mysqli_query($connect, $query);
        echo json_encode(['Delet' => 'OK']);
    }}

if ($action == 'redelTask') {
    if (isset($_POST['data']) && $_POST['data'] != '') {
        $data = $_POST['data'];
        $query = "DELETE FROM tasks WHERE id = $data;";
        $result = mysqli_query($connect, $query);

        echo json_encode(['Delet' => 'OK']);
    }}