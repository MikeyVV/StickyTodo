<?php
require("stickyTodo.php");
$username = $_POST['username'];
$password = $_POST['password'];
$stayLoggedIn = $_POST['remember'];
$mode = $_POST['mode'];


$sticky = new StickyTodo();
$sticky->signOut();

if ($mode == "sign in") {
    if (!empty($username) AND !empty($password))
        if ($sticky->signIn($username, $password, $stayLoggedIn)) echo "{\"status\":\"Sign in successfully.\"}";
        else echo "{\"status\":\"Your username and password is invalid.\"}";
    else {
        $err = "{";
        if (empty($username) AND empty($password)) {
            $err .= "\"error_username\":\"Please fill your username\"";
            $err .= ",";
            $err .= "\"error_password\":\"Please fill your password\"";
        }
        elseif (empty($username)) $err .= "\"error_username\":\"Please fill your username\"";
        elseif (empty($password)) $err .= "\"error_password\":\"Please fill your password\"";
        $err .= "}";
        echo $err;
    }
} elseif ($mode == "sign out") {
    $sticky->signOut();
}



