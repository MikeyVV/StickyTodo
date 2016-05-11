<?php
require("stickyTodo.php");

$sticky = new StickyTodo();
$sticky->get_last_add();

$out = "{\"lists\" : [";
$out .= json_encode($sticky->getResult("object"));
$out .= "]}";
echo $out;