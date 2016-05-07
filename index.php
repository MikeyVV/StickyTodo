<?php
session_start();
require ('database.php');
if($_COOKIE['username'])$_SESSION['username'];
$conn = new Database();

?>
<!DOCTYPE html>
<html>
<head>
    <title>Sticky<?php ?></title>
    <?php
    echo file_get_contents("http://angsila.cs.buu.ac.th/~57160438/887371/Sticky/header/head.html");
    ?>
</head>
<body>
<div class="container">
    <!--Sign in-->
    <div class="row">
        <div class="col-sm-3"></div><!--Makes Sign in panel center-->
        <!--Sign in form-->
        <div class="col-sm-6">
            <h2 style="text-align: center">St<i class="fa fa-check" style="color:coral" aria-hidden="true"></i>cky</h2>
            <div class="panel panel-default">
                <div class="panel-body">
                    <form role="form">
                        <!--username-->
                        <div class="form-group">
                            <label for="username">username:</label>
                            <input type="text" class="form-control" id="username">
                        </div>
                        <!--/username-->
                        <!--password-->
                        <div class="form-group">
                            <label for="password">password:</label>
                            <input type="password" class="form-control" id="password">
                        </div>
                        <!--/password-->
                        <!--Sign in button-->
                        <div class="form-group">
                            <input type="submit" class="form-control btn btn-warning" id="sign-in-btn" value="Sign in">
                        </div>
                        <!--/Sign in button-->
                    </form>
                </div>
            </div>
        </div>
        <!--/Sign in form-->
        <div class="col-sm-3"></div><!--Makes Sign in panel center-->
    </div>
    <!--/Sign in-->
</div>
</body>
</html>