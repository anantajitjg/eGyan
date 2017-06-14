$(function () {
    $.ajaxSetup({
        crossDomain: true,
        headers: {
            'X-Hasura-Role': 'user'
        }
    });
    //user info
    $.ajax({
        method: "GET",
        url: auth_url + "/user/account/info",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json"
    }).done(function (res) {
        console.log(res);
    }).fail(function (xhr) {
        console.log(xhr.responseText);
    });
});