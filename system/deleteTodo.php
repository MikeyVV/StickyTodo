<?php
require("stickyTodo.php");
$sticky = new StickyTodo();
$mode = $_POST['mode'];

$sticky->visible($_POST['id'], $_POST['mode']);