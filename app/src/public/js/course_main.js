var user_id = null,
    course_id = null,
    elemId = null,
    topicId = null,
    moduleId = null;
//insert user rating
function insertRating(rating) {
    var insert_rating_query = {
        "type": "insert",
        "args": {
            "table": "course_rating",
            "objects": [{
                "user_id": user_id,
                "course_id": course_id,
                "rating": rating
            }]
        }
    };
    $.ajax({
        method: "POST",
        url: data_url + "/v1/query",
        data: JSON.stringify(insert_rating_query),
        contentType: "application/json"
    }).done(function (data) {
        //console.log(data);
        if (data.affected_rows === 1) {
            $("#rating_msg").html("<div class='ui orange small label'>" + rating + "</div>");
        } else {
            $("#rating_msg").html("(Not yet Rated!)");
        }
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
    });
}
//fetch user rating
function fetchUserRating() {
    //query data
    var fetch_rating_query = {
        "type": "select",
        "args": {
            "table": "course_rating",
            "columns": [
                "rating"
            ],
            "where": {
                "$and": [{
                        "user_id": user_id
                    },
                    {
                        "course_id": course_id
                    }
                ]
            }
        }
    };
    $.ajax({
        method: "POST",
        url: data_url + "/v1/query",
        data: JSON.stringify(fetch_rating_query),
        contentType: "application/json"
    }).done(function (data) {
        //console.log(data);
        var elem = $("#user_feedback");
        var dataRating = 0;
        var ratingMessage = "(Not yet Rated!)";
        if (data.length > 0) {
            dataRating = data[0].rating;
            ratingMessage = "<div class='ui orange small label'>" + dataRating + "</div>";
        }
        elem.css("display", "none").html("<div class='two wide column'><strong>Your Rating:</strong></div><div class='fourteen wide column'><div class='ui star rating' id='user_course_rating' data-rating='" + dataRating + "' data-max-rating='5'></div><div id='rating_msg'>" + ratingMessage + "</div></div>").fadeIn();
        if (data.length > 0) {
            $('#user_course_rating').rating("disable");
        } else {
            $('#user_course_rating').rating({
                onRate: function (rating) {
                    $(this).rating("disable");
                    $("#rating_msg").html("<div class='ui active tiny inline loader'></div>");
                    insertRating(rating);
                }
            });
        }
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
    }).always(function () {
        $("#user_feedback .loader").hide();
    });
}
//display message on course complete
function courseCompleted() {
    $.ajax({
        method: "GET",
        url: rootURL + "/course/complete",
        data: {
            course_id: course_id
        },
        contentType: "application/json"
    }).done(function (data) {
        console.log(data);
        if (data.courseStatus === "completed") {
            $("#completed_modal .header").html("Excellent!");
            $("#completed_modal .completed_content").html("<strong>You have completed this course.</strong> Please provide your valuable feedback in the <div class='ui tiny teal button' id='feedback_section_btn'>Feedback</div> section!");
            $("#completed_modal").modal('show');
            $("#feedback_section_btn").click(function () {
                $('html, body').animate({
                    scrollTop: $("#feedback_section").offset().top
                }, 750, function () {
                    $("#completed_modal").modal('hide');
                });
            });
        }
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
    });
}

function topicCompleted() {
    $("#topic_completed_btn").click(function () {
        $(this).addClass("disabled loading");
        $.ajax({
            method: "POST",
            url: rootURL + "/topic/complete",
            data: JSON.stringify({
                topic_id: topicId,
                module_id: moduleId
            }),
            contentType: "application/json"
        }).done(function (data) {
            //console.log(data);
            if (data.topicStatus === "completed") {
                $("#topic_completed_btn").fadeOut(function () {
                    $(this).removeClass("loading").addClass("green").html("<i class='checkmark icon'></i>COMPLETED").fadeIn();
                    $("#" + elemId).data("status", 1).attr("data-status", "1");
                    $("#" + elemId + " .content").append("&nbsp;<i class='green checkmark icon'></i>");
                });
                courseCompleted();
            }
        }).fail(function (xhr) {
            //console.log(xhr.responseText);
        });
    });
}

function getTopicContent(status) {
    //query data
    var fetch_topic_details_query = {
        "type": "select",
        "args": {
            "table": "module_details",
            "columns": [
                "module_name",
                {
                    "name": "module_topics",
                    "columns": [
                        "topic_name", "topic_content", "topic_points"
                    ],
                    "where": {
                        "topic_id": topicId
                    }
                }
            ],
            "where": {
                "module_id": moduleId
            }
        }
    };
    $.ajax({
        method: "POST",
        url: data_url + "/v1/query",
        data: JSON.stringify(fetch_topic_details_query),
        contentType: "application/json"
    }).done(function (data) {
        //console.log(data);
        var status_display = status === 1 ? "<button class='ui labeled icon green button disabled' id='topic_completed_btn'><i class='checkmark icon'></i>COMPLETED</button>" : "<button class='ui labeled icon button' id='topic_completed_btn'><i class='checkmark icon'></i>MARK AS COMPLETED</button>";
        var content = "<h3 class='ui header'>" + data[0].module_name + " - " + data[0].module_topics[0].topic_name + "</h3><div class='ui top right attached large teal label'>" + data[0].module_topics[0].topic_points + "pts</div><hr class='main_hr' />" + data[0].module_topics[0].topic_content + "<hr class='main_hr' /><div class='ui basic center aligned segment'>" + status_display + "</div>";
        $("#module_content").html(content).fadeIn();
        topicCompleted();
        $('.course_video').embed({
            parameters: {
                rel: 0
            }
        });
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
    }).always(function () {
        $("#module_content .loader").hide();
    });
}

function toggleContentDisplay() {
    $(".topic_item").click(function () {
        if (!$(this).hasClass("active")) {
            $("#module_content").html("<div class='ui active massive loader'></div>").fadeIn();
            $("#syllabus_btn").removeClass("active");
            $(".topic_item").removeClass("active");
            $(this).addClass("active");
            elemId = $(this).attr("id");
            topicId = $(this).data("topicid");
            moduleId = $(this).data("moduleid");
            var status = $(this).data("status");
            $("#syllabus").fadeOut(function () {
                getTopicContent(status);
            });
        }
    })
    $("#syllabus_btn").click(function () {
        if (!$(this).hasClass("active")) {
            $("#module_content").html("<div class='ui active massive loader'></div>").fadeIn();
            $(this).addClass("active");
            $(".topic_item").removeClass("active");
            $("#module_content").fadeOut(function () {
                $("#syllabus").fadeIn();
            });
        }
    });
}
//fetch modules and topics for each modules
function getModules() {
    var fecth_modules_query = {
        "type": "select",
        "args": {
            "table": "module_details",
            "columns": [
                "module_id",
                "module_name",
                {
                    "name": "module_topics",
                    "columns": [
                        "topic_id", "topic_name"
                    ],
                    "order_by": "+topic_id"
                }, {
                    "name": "user_topic_status",
                    "columns": [
                        "user_id", "topic_id"
                    ],
                    "where": {
                        "user_id": user_id
                    },
                    "order_by": "+topic_id"
                }
            ],
            "where": {
                "course_id": course_id
            },
            "order_by": "+module_id"
        }
    };
    $.ajax({
        method: "POST",
        url: data_url + "/v1/query",
        data: JSON.stringify(fecth_modules_query),
        contentType: "application/json"
    }).done(function (data) {
        //console.log(data);
        var module_length = data.length;
        if (module_length > 0) {
            var content = "";
            for (var i = 0; i < module_length; i++) {
                var active = i === 0 ? "active" : "";
                content += "<div class='item'><div class='title " + active + "'><i class='dropdown icon'></i> " + data[i].module_name + "</div><div class='content " + active + "'><div class='ui link list topic_list'>";
                for (var j = 0; j < data[i].module_topics.length; j++) {
                    var topic_stat = 0;
                    for (var k = 0; k < data[i].user_topic_status.length; k++) {
                        if (data[i].user_topic_status[k]) {
                            if (data[i].user_topic_status[k].topic_id === data[i].module_topics[j].topic_id) {
                                topic_stat = 1;
                            }
                        }
                    }
                    var status_display = topic_stat === 1 ? "&nbsp;<i class='green checkmark icon'></i>" : "";
                    content += "<a class='item topic_item' id='topic_" + data[i].module_topics[j].topic_id + "' data-topicid='" + data[i].module_topics[j].topic_id + "' data-moduleid='" + data[i].module_id + "' data-status='" + topic_stat + "'><i class='arrow right icon'></i><div class='content'>" + data[i].module_topics[j].topic_name + status_display + "</div></a>";
                }
                content += "</div></div></div>";
            }
            $('#main_course_accordion').css("display", "none").html(content).fadeIn(function () {
                $(this).accordion();
            });
            toggleContentDisplay();
        } else {
            $('#main_course_accordion').css("display", "none").html("<div class='ui info message'><div><em>Currently Not Available!</em></div></div>").fadeIn();
        }
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
    }).always(function () {
        $("#main_course_accordion .loader").hide();
    });
}
$(function () {
    //get course id
    course_id = parseInt(window.location.pathname.split('/')[3]);
    //get user info
    $.ajax({
        method: "GET",
        url: auth_url + "/user/account/info",
        contentType: "application/json"
    }).done(function (res) {
        //console.log(res);
        user_id = res.hasura_id;
        getModules();
        fetchUserRating();
    }).fail(function (xhr) {
        //console.log(xhr.responseText);
        window.location = "/";
    });
});