<?php
require ("stickyTodo.php");
$id = $_POST['id'];
$topic = $_POST['topic'];
$mode = $_POST['mode'];
$list_number = $_POST['list_number'];

$sticky = new StickyTodo();
if($mode == "add"){
    echo $sticky->add_todo($topic, $list_number);

}elseif ($mode == "edit"){
    $sticky->edit_topic($id,$topic);
}
