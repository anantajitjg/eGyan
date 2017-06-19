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

function displayCourses(user_id) {
    var fetch_courses_query = {
        "type": "select",
        "args": {
            "table": "course_details",
            "columns": [
                "course_id", "name", "about", "course_logo",
                {
                    "name": "enrolled_count",
                    "columns": ["enrolled"]
                },
                {
                    "name": "course_act_rating",
                    "columns": ["count", "rating"]
                },
                {
                    "name": "user_course_rating",
                    "columns": ["rating"],
                    "where": {
                        "user_id": user_id
                    }
                },
                {
                    "name": "user_course_status",
                    "columns": ["status"],
                    "where": {
                        "user_id": user_id
                    }
                }
            ],
            "order_by": ["-course_act_rating.rating", "-course_act_rating.count", "-enrolled_count.enrolled"]
        }
    };
    $.ajax({
        method: "POST",
        url: data_url + "/v1/query",
        data: JSON.stringify(fetch_courses_query),
        contentType: "application/json"
    }).done(function (data) {
        //console.log(data);
        var not_enrolled_courses = [],
            completed_courses = [],
            active_courses = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].user_course_status.length > 0) {
                if (data[i].user_course_status[0].status) {
                    completed_courses.push(data[i]);
                } else {
                    active_courses.push(data[i]);
                }
            } else {
                not_enrolled_courses.push(data[i]);
            }
        }
        displayAccordion(not_enrolled_courses, $("#available_course_accordion"), "enroll");
        displayAccordion(completed_courses, $("#completed_course_accordion"), "completed");
        displayAccordion(active_courses, $("#active_course_accordion"), "active");
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
        displayAccordionError($(".main_accordion"));
    }).always(function () {
        $(".course_loader").hide();
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
        displayCourses(res.hasura_id);
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
        window.location = "/";
    });
});