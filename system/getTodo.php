<?php
session_start();
require("stickyTodo.php");
$sticky = new StickyTodo();
$sticky->get_todo();

$out = "{\"lists\" : [";
for ($i = 0; $i < $sticky->getNumRow(); $i++) {
    if ($out != "{\"lists\" : [") $out .= ",";
    $out .= json_encode($sticky->getResult("object"));
}
$out .= "]}";
echo $out;
