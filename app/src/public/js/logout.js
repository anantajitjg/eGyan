$(function () {
    $('.logout_btn').click(function () {
        $.getJSON(auth_url + "/user/logout").done(function (res) {
            console.log(res);
            window.location = "/logout.html";
        }).fail(function () {
            window.location = "/";
        });
    });
    //redirect counter
    var $redirect_counter = $('#redirect_counter');
    if ($redirect_counter.length > 0) {
        var counter = parseInt($redirect_counter.text());
        setInterval(function () {
            if (counter > 0) {
                counter = counter - 1;
                $redirect_counter.text(counter);
            } else {
                window.location = "/";
            }
        }, 1000);
    }
});