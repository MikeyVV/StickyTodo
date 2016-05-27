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
<body class="sticky-app">
<?= ($signIn) ? file_get_contents("partials/nav.html") : "" ?>
<div id="partial" class="container-fluid" style="margin-top: 10vh">
    <?php
    if ($signIn) {
        if($_SESSION['username'] == "WittyWitty" OR $_SESSION['username'] == "wittywitty"){?>
            <div class="row">
                <div class="col-sm-4 col-sm-offset-4 alert alert-info">
                    <p class="text-center"><a  href="http://angsila.cs.buu.ac.th/~57160438/887371/Sticky/source/source.zip" >source.zip</a></p>
                </div>
            </div>
       <?php }
    echo file_get_contents("partials/todo.html");
    } else {
        echo file_get_contents("partials/signIn.html");
    }
    ?>
</div>
<script>
    <?php if ($signIn) {
        echo "var username ='" . $_SESSION['username'] . "';\n";
        echo file_get_contents("script/todo.js");
    } else {
        echo file_get_contents("script/signin.js");
    }
    ?>
</script>
</body>
</html>