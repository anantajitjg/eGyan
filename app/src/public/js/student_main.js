function displayName(user_id) {
    var fetch_name_query = {
        "type": "select",
        "args": {
            "table": "user_other_details",
            "columns": [
                "user_id", "name"
            ],
            "where": {
                "user_id": user_id
            }
        }
    };
    $.ajax({
        method: "POST",
        url: data_url + "/v1/query",
        data: JSON.stringify(fetch_name_query),
        contentType: "application/json"
    }).done(function (data) {
        //console.log(data);
        $("#displayName").css("display", "none").html(data[0].name).fadeIn();
    }).fail(function (xhr) {
        console.log(xhr.responseText);
    });
}
$(function () {
    //get user info
    $.ajax({
        method: "GET",
        url: auth_url + "/user/account/info",
        contentType: "application/json"
    }).done(function (res) {
        //console.log(res);
        displayName(res.hasura_id);
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
        window.location = "/";
    });
});