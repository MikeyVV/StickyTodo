<?php
session_start();
require("stickyTodo.php");
$sticky = new StickyTodo();
$mode = $_POST['mode'];
if(empty($mode))
$sticky->get_todo();
else $sticky->search_topic($_POST['topic']);

$out = "{\"lists\" : [";
for ($i = 0; $i < $sticky->getNumRow(); $i++) {
    if ($out != "{\"lists\" : [") $out .= ",";
    $out .= json_encode($sticky->getResult("object"));
}
$out .= "]}";
echo $out;
