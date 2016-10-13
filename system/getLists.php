<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 13/10/2559
 * Time: 15:16
 */

session_start();
require("stickyTodo.php");
$sticky = new StickyTodo();
$sticky->get_lists();

$out = "{\"lists\" : [";
for ($i = 0; $i < $sticky->getNumRow(); $i++) {
    if ($out != "{\"lists\" : [") $out .= ",";
    $out .= json_encode($sticky->getResult("object"));
}
$out .= "]}";
echo $out;