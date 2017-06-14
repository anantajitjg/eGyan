$(function () {
    $.ajaxSetup({
        crossDomain: true,
        headers: {
            'X-Hasura-Role': 'user'
        }
    });
    //user info
    $.getJSON(auth_url + "/user/account/info").done(function (res) {
        console.log(res);
    }).fail(function (xhr) {
        console.log(xhr.responseText);
    });
});