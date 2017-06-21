function displayAccordionInfo(accordion_selector, message) {
    accordion_selector.css("display", "none").html("<div class='ui info message'><div><em>" + message + "</em></div></div>").fadeIn();
}

function displayAccordionError(accordion_selector) {
    accordion_selector.css("display", "none").html("<div class='ui negative message'><div class='ui header'>Error occured!</div><div>Please refresh this page or come back later!</div></div>").fadeIn();
}

function getCourseStatusContent(id, status) {
    var status_content = "",
        button_content = "";
    if (status === "active" || status === "completed" || status === "enroll") {
        button_content = "<div class='row'><div class='column'><a href='/course/id/" + id;
        if (status === "active" || status === "completed") {
            var status_display = status === "active" ? "<em>Not yet Completed</em>" : "Completed";
            var button_display = status === "active" ? "?status=active' class='ui teal button'>CONTINUE" : "?status=completed' class='ui positive button'>GO TO COURSE";
            status_content = "<div class='row'><div class='two wide column'><strong>Status:</strong></div><div class='fourteen wide column'>" + status_display + "</div></div>";
            button_content += button_display;
        } else {
            button_content += "?status=available' class='ui primary button'>ENROLL";
        }
        button_content += "</a></div></div>";
    }
    return status_content + button_content;
}

function displayAccordion(data, accordion_selector, course_status) {
    var courses = [],
        starred_courses = [],
        unstarred_courses = [],
        unenrolled_courses = [];
    var content = "",
        student_content = "";
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
            course_info.id = courses[i].course_id;
            course_info.name = courses[i].name;
            course_info.about = courses[i].about;
            course_info.logo = courses[i].course_logo;
            course_info.rating = courses[i].course_act_rating ? courses[i].course_act_rating.rating : 0;
            course_info.users_rated = courses[i].course_act_rating ? courses[i].course_act_rating.count : 0;
            course_info.user_rating = courses[i].user_course_rating ? courses[i].user_course_rating.length > 0 ? courses[i].user_course_rating[0].rating : 0 : 0;
            course_info.enrolled = courses[i].enrolled_count ? courses[i].enrolled_count.enrolled : 0;
            //console.table(course_info);
            var active_class = course_status === "active" ? "active" : "";
            var rating_display = course_info.users_rated > 0 ? course_info.rating + " out of 5 by " + course_info.users_rated : "<em>Not yet Rated!</em>";
            var user_rating_display = course_status === "completed" ? course_info.user_rating > 0 ? "<p class='user_rating'>Your Rating: " + course_info.user_rating + "</p>" : "<em>Not yet Rated!</em>" : "";
            //content for accordion
            content += "<div class='item'><div class='title " + active_class + "'><i class='dropdown icon'></i> <img src='/uploads/" + course_info.logo + "' class='ui avatar image' /> <strong>" + course_info.name + "</strong><div class='star_wrapper'><div class='ui star rating' data-rating='" + course_info.rating + "' data-max-rating='5'></div></div><div class='clear_fix'></div></div><div class='content " + active_class + "'><div class='ui grid'><div class='row'><div class='two wide column'><strong>About:</strong></div><div class='fourteen wide column'>" + course_info.about + "</div></div><div class='row'><div class='two wide column'><strong>Total Enrolled:</strong></div><div class='fourteen wide column'>" + course_info.enrolled + "</div></div><div class='row'><div class='two wide column'><strong>Rating:</strong></div><div class='fourteen wide column'>" + rating_display + user_rating_display + "</div></div>" + getCourseStatusContent(course_info.id, course_status) + "</div></div></div>";
        }
        accordion_selector.css("display", "none").html(content).fadeIn(function () {
            if (course_status === "active") {
                accordion_selector.accordion({
                    exclusive: false
                });
            } else {
                accordion_selector.accordion();
            }
            $('.ui.rating').rating('disable');
        });
    } else {
        if (course_status === "active") {
            displayAccordionInfo(accordion_selector, "No Active Courses! Why don't you try some from Available Courses!");
        } else if (course_status === "completed") {
            displayAccordionInfo(accordion_selector, "Not Completed any Courses!");
        } else {
            displayAccordionInfo(accordion_selector, "No courses to display!");
        }
    }
}