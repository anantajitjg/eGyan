$(function () {
    var $login_form = $('#login_form');
    var $signup_form = $('#signup_form');
    $login_form.submit(function (e) {
        e.preventDefault();
    });
    $signup_form.submit(function (e) {
        e.preventDefault();
    });
    var fields_rules = {
        username: {
            identifier: 'username',
            rules: [{
                    type: 'empty',
                    prompt: 'Please enter a username'
                }]
        },
        password: {
            identifier: 'password',
            rules: [{
                type: 'empty',
                prompt: 'Please enter your password'
            }, {
                type: 'minLength[8]',
                prompt: 'Your password must be at least {ruleValue} characters'
            }]
        }
    };
    // login form
    //=================================================
    $login_form.form({
        fields: fields_rules,
        onFailure: function () {
            $(".login_modal").modal("refresh");
        },
        onInvalid: function () {
            if ($('.user_error').text() !== '') {
                $('.user_error').css("display", "none");
            }
        },
        onSuccess: function (e) {
            e.preventDefault();
            var fields = $login_form.form('get values');
            //console.log(fields);
            $("#login_loader").css("display", "inline");
            $("#login_btn").addClass("disabled");
            $('form .message').html("");
            $('.user_error').css("display", "none");
            var req_body = {
                "provider": "username",
                "data": fields
            };
            $.ajax({
                method: "POST",
                url: auth_query_url + "/login",
                xhrFields: {
                    withCredentials: true
                },
                data: JSON.stringify(req_body),
                contentType: "application/json"
            }).done(function (res) {
                //console.log(res);
                var user_id = res.hasura_id;
                $.getJSON(rootURL + "/setinfo", { user_id: user_id})
                    .done(function(json) {
                        //console.log(json);
                        window.location = "/student";
                    }).fail(function(xhr) {
                        //console.log(xhr);
                        onLoginFail("Failed to login!");
                    });
            }).fail(function (xhr) {
                //console.log(xhr);
                onLoginFail("Username or Password is wrong!");
            }).always(function () {
                $("#login_loader").css("display", "none");
            });
        }
    });
    function onLoginFail(msg) {
        $("#login_btn").removeClass("disabled");
        $login_form.append("<div class='ui error message user_error' style='display:block;'><div class='header'>" + msg + "</div><p>Please try again!</p></div>");
        $(".login_modal").modal("refresh");
    }
    // signup form
    //=================================================
    fields_rules.name = {
        identifier: 'name',
        rules: [{
            type: 'empty',
            prompt: 'Please enter your name'
        }]
    };
    $signup_form.form({
        fields: fields_rules,
        onFailure: function () {
            $(".signup_modal").modal("refresh");
        },
        onInvalid: function () {
            if ($('.user_error').text() !== '') {
                $('.user_error').css("display", "none");
            }
        },
        onSuccess: function (e) {
            e.preventDefault();
            var fields = $signup_form.form('get values');
            //console.log(fields);
            $("#signup_loader").css("display", "inline");
            $("#signup_btn").addClass("disabled");
            $('form .message').html("");
            $('.user_error').css("display", "none");
            var data = JSON.stringify(fields);
            $.ajax({
                method: "POST",
                url: rootURL + "/signup",
                data: data,
                contentType: "application/json"
            }).done(function (res) {
                $signup_form.append("<div class='ui success message'><div class='header'>" + res + "</div><br />You can now <div class='ui tiny teal button login_trigger'>Log In</div> with your username and password!</div>");
                $(".signup_modal").modal("refresh");
                $('.login_trigger').click(function () {
                    triggerModal(".login_modal");
                });
            }).fail(function (xhr) {
                //console.log(xhr);
                $("#signup_btn").removeClass("disabled");
                try {
                    var result = JSON.parse(xhr.responseText);
                    $signup_form.append("<div class='ui error message user_error' style='display:block;'><div class='header'>There were some errors!</div><p>" + result.message + "</p></div>");
                } catch (e) {
                    $signup_form.append("<div class='ui error message user_error' style='display:block;'><div class='header'>Error occurred! Please try again after some time.</div></div>");
                } finally {
                    $(".signup_modal").modal("refresh");
                }
            }).always(function () {
                $("#signup_loader").css("display", "none");
            });
        }
    });
});