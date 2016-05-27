<?php
require("stickyTodo.php");
$mode = $_POST['mode'];
$sticky = new StickyTodo();
$username = $_POST['username'];
$sticky->select_where_one("USERNAME", $username, "sticky_user");
if ($mode == "check username") {
    echo ($sticky->getNumRow() > 0) ? "&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\"></i>&nbsp;this username is already in used." : "&nbsp;<i class=\"fa fa-check\" aria-hidden=\"true\"></i>&nbsp;you can use this username.";
} elseif ($mode == "sign up authentication") {
    $password = $_POST['password'];
    $repeatPassword = $_POST['repeatPassword'];
    if ($sticky->getNumRow() == 0 AND $password == $repeatPassword) {
        $sticky->add_user($username, $password);
        $sticky->signIn($username, $password, null);
    } else echo 13;
}
