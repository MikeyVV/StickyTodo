<?php
session_start();
if ($_COOKIE['username']) $_SESSION['username'] = $_COOKIE['username'];
if ($_SESSION['username']) $signIn = true;
else $signIn = false; // 1 = true , other false
?>
<!DOCTYPE html>
<html>
<head>
    <title>
        Sticky |
        <?= ($signIn) ? "Todo" : "Sign in"; ?>
    </title>
    <?php
    echo file_get_contents("http://angsila.cs.buu.ac.th/~57160438/887371/Sticky/header/head.html");
    ?>
</head>
<body>
<div class="container">
    <div class="row" id="partial">
        <?php
        if ($signIn) {

        } else {
            echo file_get_contents("partials/signIn.html");
        }
        ?>
    </div>
</div>


<script>
    <?=($signIn) ? file_get_contents("script/todo.js") : file_get_contents("script/signin.js") ?>
</script>
</body>
</html>