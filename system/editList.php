<?php
require("stickyTodo.php");
$id = $_POST['id'];
$topic = $_POST['topic'];

$sticky = new StickyTodo();
$sticky->edit_topic($id,$topic);