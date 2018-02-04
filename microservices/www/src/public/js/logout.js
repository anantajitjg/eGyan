$(function () {
    $('.logout_btn').click(function () {
        $(this).addClass("loading disabled");
        $.ajax({
            method: "POST",
            url: auth_query_url + "/user/logout",
            contentType: "application/json"
        }).done(function (res) {
            //console.log(res);
            window.location = "/logout";
        }).fail(function (xhr) {
            console.log("Error logging you out!");
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