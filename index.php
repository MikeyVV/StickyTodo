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

    $(document).ready(function () {
        /*
         Variables.
         */
        var isSignIn = <?=($signIn) ? "true" : "false";?>;
        var lost = true;

        /*
         Sign in authentication.
         */

        function signIn() {

            var username = $("#username").val();
            var password = $("#password").val();
            var remember = $("#remember").is(":checked");


                $.post("system/authentication.php",
                    {
                        username: username,
                        password: password,
                        remember: remember,
                        mode: "sign in"
                    },
                    function (data) {
                        var data = JSON.parse(data);
                        if (data.status) {
                            if (data.status == "Sign in successfully.") {
                                $("#alert").replaceWith("<div id=\"alert\" class=\"alert alert-success\">" + data.status + "<\/div>");
                                location.reload();
                            }
                            else
                                $("#alert").replaceWith("<div id=\"alert\" class=\"alert alert-danger\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> " + data.status + "<\/div>");
                        }
                        else {
                            if (data.error_username) {
                                $("#f_username").addClass("has-error");
                                $("#error_username").html(" <i class=\"fa fa-exclamation\" style=\"color:red\" aria-hidden=\"true\"><\/i>");
                                $("#alert").replaceWith("<div id=\"alert\" class=\"alert alert-danger\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> " + data.error_username + "<\/div>");
                            }
                            if (data.error_password) {
                                $("#f_password").addClass("has-error");
                                $("#error_password").html(" <i class=\"fa fa-exclamation\" style=\"color:red\" aria-hidden=\"true\"><\/i>");
                                $("#alert").replaceWith("<div id=\"alert\" class=\"alert alert-danger\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> " + data.error_password + "<\/div>");
                            }
                        }
                    }
                );

        }

        $("#sign-in-form").submit(function (event) {
            event.preventDefault();
            signIn();
        });
    });
</script>
</body>
</html>