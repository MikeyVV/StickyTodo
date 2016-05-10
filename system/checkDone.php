<?php
require("stickyTodo.php");
$sticky = new StickyTodo();
$status = $_POST['status'];
$id = $_POST['id'];

$sticky->status($id,$status);