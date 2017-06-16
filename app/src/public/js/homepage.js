// Trigger Login/Sign Up Modal
function triggerModal(selector) {
    $(selector).modal({
        onHidden: function () {
            $('form').form('clear');
            $('form .message').html("");
            $(".main_loader").css("display", "none");
            $("form .button").removeClass("disabled");
            $('.user_error').css("display", "none");
        }
    }).modal('show');
}
// Accordion
function displayAccordion() {
    $('.ui.accordion')
        .accordion();
}
// Rating
function displayRating() {
    $('.ui.rating')
        .rating('disable');
}
$(function () {
    // fix menu when passed
    $('.masthead')
        .visibility({
            once: false,
            onBottomPassed: function () {
                $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function () {
                $('.fixed.menu').transition('fade out');
            }
        });
    //Login/Sign Up Modal
    $('.signup_trigger').click(function () {
        triggerModal(".signup_modal");
    });
    $('.login_trigger').click(function () {
        triggerModal(".login_modal");
    });
    //Load Courses
    var fetch_course_query = {
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
                }
            ],
            "order_by": ["-course_act_rating.rating", "-course_act_rating.count", "-enrolled_count.enrolled"]
        }
    };
    $.ajax({
        method: "POST",
        url: data_url + "/v1/query",
        data: JSON.stringify(fetch_course_query),
        contentType: "application/json"
    }).done(function (data) {
        //console.log(data);
        var courses = [],
            starred_courses = [],
            unstarred_courses = [],
            unenrolled_courses = [];
        var content = "";
        var total_courses = data.length;
        if (total_courses > 0) {
            for (var i = 0; i < total_courses; i++) {
                if (data[i].course_act_rating !== null && data[i].enrolled_count !== null) {
                    starred_courses.push(data[i]);
                } else {
                    if (data[i].enrolled_count === null) {
                        unenrolled_courses.push(data[i]);
                    } else {
                        unstarred_courses.push(data[i]);
                    }
                }
            }
            unstarred_courses = unstarred_courses.concat(unenrolled_courses);
            courses = starred_courses.concat(unstarred_courses);
            for (var i = 0; i < courses.length; i++) {
                var course_info = {};
                course_info.name = courses[i].name;
                course_info.about = courses[i].about;
                course_info.logo = courses[i].course_logo;
                course_info.rating = courses[i].course_act_rating ? courses[i].course_act_rating.rating : 0;
                course_info.users_rated = courses[i].course_act_rating ? courses[i].course_act_rating.count : 0;
                course_info.enrolled = courses[i].enrolled_count ? courses[i].enrolled_count.enrolled : 0;
                //console.table(course_info);
                var rating_display = course_info.users_rated > 0 ? course_info.rating + " out of 5 by " + course_info.users_rated : "<em>Not yet Rated!</em>";
                content += "<div class='item'><div class='title'><i class='dropdown icon'></i> <img src='/uploads/" + course_info.logo + "' class='ui avatar image' /> <strong>" + course_info.name + "</strong><div class='star_wrapper'><div class='ui star rating' data-rating='" + course_info.rating + "' data-max-rating='5'></div></div><div class='clear_fix'></div></div><div class='content'><div class='ui grid'><div class='row'><div class='two wide column'><strong>About:</strong></div><div class='fourteen wide column'>" + course_info.about + "</div></div><div class='row'><div class='two wide column'><strong>Total Enrolled:</strong></div><div class='fourteen wide column'>" + course_info.enrolled + "</div></div><div class='row'><div class='two wide column'><strong>Rating:</strong></div><div class='fourteen wide column'>" + rating_display + "</div></div></div></div></div>";
            }
            $("#course_accordion").css("display", "none").html(content).fadeIn(function () {
                displayAccordion();
                displayRating();
            });
        } else {
            $("#course_accordion").css("display", "none").html("<div class='ui info message'><div class='ui header'>No courses to display!</div></div>").fadeIn();
        }
    }).fail(function (xhr) {
        //console.log(xhr);
        $("#course_accordion").css("display", "none").html("<div class='ui negative message'><div class='ui header'>Error occured!</div><div>Please refresh this page or come back later!</div></div>").fadeIn();
    }).always(function () {
        $("#course_loader").hide();
    });
});