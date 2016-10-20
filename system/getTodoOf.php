<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 20/10/2559
 * Time: 19:23
 */

session_start();
require("stickyTodo.php");
$sticky = new StickyTodo();
$list_number = $_POST["list_number"];
$sticky->get_todo_of($list_number);

$out = "{\"lists\" : [";
for ($i = 0; $i < $sticky->getNumRow(); $i++) {
    if ($out != "{\"lists\" : [") $out .= ",";
    $out .= json_encode($sticky->getResult("object"));
}
$out .= "]}";
echo $out;