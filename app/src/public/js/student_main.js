$(function () {
    //get user info
    $.ajax({
        method: "GET",
        url: auth_url + "/user/account/info",
        contentType: "application/json"
    }).done(function (res) {
        //console.log(res);
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
        //window.location="/";
    });
});