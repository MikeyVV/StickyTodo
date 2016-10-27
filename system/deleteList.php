<?php
require("stickyTodo.php");
$sticky = new StickyTodo();

$sticky->list_hide($_POST['list_number']);