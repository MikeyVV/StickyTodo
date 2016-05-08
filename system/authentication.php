<?php
require("../database.php");
$username = $_POST['username'];
$password = $_POST['password'];
$stayLoggedIn = $_POST['remember'];
$mode = $_POST['mode'];

$conn = new Database();

if($mode == "sign in")
{
    if($conn->signIn($username,$password,$stayLoggedIn))echo "Sign in successfully.";
    else echo "You username or email is invalid.";
}
elseif ($mode == "sign out")
{
    $conn->signOut();
}

