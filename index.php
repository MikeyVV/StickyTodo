<?php
session_start();
if ($_COOKIE['username']) $_SESSION['username'];
if ($_SESSION['username']) $signIn = true;
else $signIn = false;
?>
<!DOCTYPE html>
<html>
<head>
    <title>Loading...</title>
    <?php
    echo file_get_contents("http://angsila.cs.buu.ac.th/~57160438/887371/Sticky/header/head.html");
    ?>
</head>
<body>
<div class="container">
    <div class="row" id="partial"></div>
</div>
<script>
    /*
     Sign in authentication.
     */
    $(document).ready(
        function () {
            signIn = <?php echo $signIn ?>;
            lost = true;
            function authen(signIn) {
                if(lost)
                {
                    if (signIn && !lost)
                    {
                        //Load Todo app partial
                        $("title").html("Sticky | Todo");
                    }
                    else if(lost)
                    {
                        //Load sign in partial
                        $("#partial").load("partials/signIn.html");
                        $("title").html("Sticky | Sign in");
                    }    
                }
                
            }

            setInterval(authen,1000);

            function signIn() {
                
                $.post("system/authentication.php",
                    {
                        username: $("#username").val(),
                        password: $("#password").val()
                    },
                    function ()
                    {
                        lost = false;
                    }
                );
            }
        }
    );

</script>
</body>
</html>