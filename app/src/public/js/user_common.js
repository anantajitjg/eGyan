$(function () {
    $.ajaxSetup({
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'X-Hasura-Role': 'user'
        }
    });
});