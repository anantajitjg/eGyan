function displayUserInfo(user_id) {
    var fetch_name_query = {
        "type": "select",
        "args": {
            "table": "user_other_details",
            "columns": [
                "user_id", "name", "points"
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
        $("#displayName .content").html("<em>Hi " + data[0].name + "</em>");
        $('#displayName').transition({
            animation: 'fade right',
            duration: '400ms'
        });
        $("#total_points").html(data[0].points + "pts").fadeIn();
        displayBadges();
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
    });
}
//For displaying Badges
function displayBadges() {
    $.ajax({
        method: "GET",
        url: rootURL + "/fetch/badge",
        contentType: "application/json"
    }).done(function (data) {
        //console.log(data);
        var total_badges = data.length;
        if (total_badges > 0) {
            var badge_msg_content = "",
                badge_content = "";
            for (var i = 0; i < total_badges; i++) {
                if (data[i].user_badge_status.length === 0) {
                    badge_msg_content += "<div class='ui positive message'><i class='close icon'></i><div class='header'>Congratulations!</div><p>You have received <b>" + data[i].name + "!</b> " + data[i].badge_description + "</p></div>";
                }
            }
            for (var i = total_badges - 1; i >= 0; i--) {
                var points_display = data[i].points > 0 ? "<div class='ui center aligned'><span class='ui grey label'>" + data[i].points + "pts</span></div>" : "";
                badge_content += "<div class='card'><div class='image'><img class='ui image' src='/img/" + data[i].badge_logo + "'></div><div class='content'><div class='ui center aligned tiny header'>" + data[i].name + "</div>" + points_display + "</div></div>";
            }
            $("#user_badge_message").css("display", "none").html(badge_msg_content).fadeIn();
            $("#badge").css("display", "none").html(badge_content).fadeIn();
            $(".message .close").on('click', function () {
                $(this).closest('.message').transition('fade');
            });
        }
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
        $("#badge").css("display", "none").html("<div class='ui negative message'><div class='ui header'>Error occured!</div><div>Please refresh this page or come back later!</div></div>").fadeIn();
    }).always(function () {
        $("#badge .loader").hide();
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
                    "name": "avg_course_rating",
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
            "where": {
                "active": true
            },
            "order_by": ["-avg_course_rating.rating", "-avg_course_rating.count", "-enrolled_count.enrolled"]
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
        displayUserInfo(res.hasura_id);
        displayCourses(res.hasura_id);
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
        window.location = "/";
    });
});