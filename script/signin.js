$(document).ready(function () {
    /*
     Variables.
     */

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
                    $("#f_username").removeClass("has-error");
                    $("#f_password").removeClass("has-error");
                    $("#error_username").html("");
                    $("#error_password").html("");
                    if (data.status == "Sign in successfully.") {
                        $("#alert2").replaceWith("<div id=\"alert2\"><\/div>");
                        $("#alert1").replaceWith("<div id=\"alert1\" class=\"alert alert-success\">" + data.status + "<\/div>");
                        location.reload();
                    }
                    else {
                        $("#alert2").replaceWith("<div id=\"alert2\"><\/div>");
                        $("#alert1").replaceWith("<div id=\"alert1\" class=\"alert alert-danger\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> " + data.status + "<\/div>");
                    }
                }
                else {
                    if (data.error_username) {
                        var alert1 = $("#alert1");
                        $("#f_username").addClass("has-error");
                        $("#error_username").html(" <i class=\"fa fa-exclamation\" style=\"color:red\" aria-hidden=\"true\"><\/i>");
                        alert1.replaceWith("<div id=\"alert1\" style='display: none' class=\"alert alert-danger\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> " + data.error_username + "<\/div>");
                        alert1.fadeIn();
                    }else {
                        $("#error_username").html("");
                        $("#f_username").removeClass("has-error");
                        $("#alert1").replaceWith("<div id=\"alert1\"><\/div>");
                    }
                    if (data.error_password) {
                        $("#f_password").addClass("has-error");
                        $("#error_password").html(" <i class=\"fa fa-exclamation\" style=\"color:red\" aria-hidden=\"true\"><\/i>");
                        $("#alert2").replaceWith("<div id=\"alert2\" class=\"alert alert-danger\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> " + data.error_password + "<\/div>");
                    }else {
                        $("#error_password").html("");
                        $("#f_password").removeClass("has-error");
                        $("#alert2").replaceWith("<div id=\"alert2\"><\/div>");
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