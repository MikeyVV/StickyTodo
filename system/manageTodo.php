<?php
require ("stickyTodo.php");
$id = $_POST['id'];
$topic = $_POST['topic'];
$mode = $_POST['mode'];

$sticky = new StickyTodo();
if($mode == "add"){
    $sticky->add_todo($topic);

}elseif ($mode == "edit"){
    $sticky->edit_topic($id,$topic);
}
