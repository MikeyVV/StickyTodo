$(document).ready(function () {
    /*
     Variables.
     */

    var lost = true;

    /*
     Sign in authentication.
     */

    function signInAuthen() {

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
                        $("#alert1").replaceWith("<div id=\"alert1\" style='display: none' class=\"alert alert-danger\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> " + data.status + "<\/div>");
                        $("#alert1").fadeIn();
                    }
                }
                else {
                    if (data.error_username) {
                        $("#f_username").addClass("has-error");
                        $("#error_username").html(" <i class=\"fa fa-exclamation\" style=\"color:red\" aria-hidden=\"true\"><\/i>");
                        $("#alert1").replaceWith("<div id=\"alert1\" style='display: none' class=\"alert alert-danger\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> " + data.error_username + "<\/div>");
                        $("#alert1").fadeIn();
                    } else {
                        $("#error_username").html("");
                        $("#f_username").removeClass("has-error");
                        $("#alert1").replaceWith("<div id=\"alert1\"><\/div>");
                    }
                    if (data.error_password) {
                        $("#f_password").addClass("has-error");
                        $("#error_password").html(" <i class=\"fa fa-exclamation\" style=\"color:red\" aria-hidden=\"true\"><\/i>");
                        $("#alert2").replaceWith("<div id=\"alert2\" style='display: none' class=\"alert alert-danger\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> " + data.error_password + "<\/div>");
                        $("#alert2").fadeIn();
                    } else {
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
        signInAuthen();
    });

    $("#guest-access").fadeIn();

    /*
     sign up controller
     */

    /* class SignUp */
    /*function SignUp() {
        this.isUsernameUsed = false;
        this.isPasswordMatch = false;
        this.showSignUpPage = function () {
            $("title").html("Sticky | Sign up");
            $("#signin-partial").css("display", "none");
            $("#signup-partial").css("display", "block");
        };
        this.showSignInPage = function () {
            $("title").html("Sticky | Sign in");
            $("#signin-partial").css("display", "block");
            $("#signup-partial").css("display", "none");
        };
        this.checkForm = function () {
            var valid = ($("#username_signup").val().length > 0 && $("#password_signup").val().length > 0) && ($("#repeat_password_signup").val().length > 0 && !this.isUsernameUsed) && this.isPasswordMatch;
            $("#sign-up-btn").prop("disabled", !valid);
            return valid;
        };
        this.SignUpAuthen = function () {
            $.post
            (
                "system/checkSignUp.php",
                {
                    username: $("#username_signup").val(),
                    password: $("#password_signup").val(),
                    mode: "sign up authentication"
                },
                function (data) {
                    if (data == 13) {
                        $("#alert1_signup").replaceWith("<div id=\"alert1_signup\" style='display: none' class=\"alert alert-danger\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> there is something wrong.<\/div>");
                    } else $("#alert1_signup").empty();
                }
            );
        }
    }*/

    /* end of class SignUp */

    /*
     Create object from SignUp's class
     */

    //var signUpPage = new SignUp();

    /*
     switch page
     */

    /*$("#signup-link").click(function (e) {
        e.preventDefault();
        signUpPage.showSignUpPage();
    });
    $("#signin-link").click(function (e) {
        e.preventDefault();
        signUpPage.showSignInPage();
    });*/

    /*
     check empty form
     */

    /*$("#username_signup").blur(function () {
        if ($("#username_signup").val().length == 0) {
            $("#error_username_signup").html("&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\"></i>&nbsp;fill your username.");
        }
        signUpPage.checkForm();
    });

    $("#password_signup").blur(function () {
        if ($("#password_signup").val().length == 0) {
            $("#error_password_signup").html("&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\"></i>&nbsp;fill your password.");
        } else {
            $("#error_password_signup").html("")
        }
        signUpPage.checkForm();
    });

    $("#repeat_password_signup").blur(function () {
        if ($("#repeat_password_signup").val().length == 0) {
            $("#error_repeat_password_signup").html("&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\"></i>&nbsp;repeat your password.");
        }
        signUpPage.checkForm();
    });*/

    /*
     check username
     */

    /*$("#username_signup").change(function () {
        if ($(this).val().length > 0) {
            $.post
            (
                "system/checkSignUp.php",
                {
                    username: $(this).val(),
                    mode: "check username"
                },
                function (data, success) {
                    if (success == "success") {
                        signUpPage.isUsernameUsed = (data == "&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\"></i>&nbsp;this username is already in used.");
                        $("#error_username_signup").html(data);
                    }
                    signUpPage.checkForm();
                }
            );
        }
    });*/

    /*
     check password
     */

    /*$("#repeat_password_signup").change(function () {
        if ($(this).val().length > 0) {
            if ($(this).val() != $("#password_signup").val()) {
                $("#error_repeat_password_signup").html("&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\"></i>&nbsp;your password is not match.");
                this.isPasswordMatch = false;
            } else {
                $("#error_repeat_password_signup").html("");
                this.isPasswordMatch = true;
            }
        }
        signUpPage.checkForm();
    });

    $("#password_signup").change(function () {
        if ($("#repeat_password_signup").val().length > 0) {
            if ($(this).val() != $("#repeat_password_signup").val()) {
                $("#error_repeat_password_signup").html("&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\"></i>&nbsp;your password is not match.");
                this.isPasswordMatch = false;
            } else {
                $("#error_repeat_password_signup").html("");
                this.isPasswordMatch = true;
            }
        }
        signUpPage.checkForm();
    });*/

    /*
     Sign up form submit
     */

    /*$("#sign-up-form").submit(function (e) {
        e.preventDefault();
        if (signUpPage.checkForm()) {
            signUpPage.SignUpAuthen();
        }
    });*/

})
;