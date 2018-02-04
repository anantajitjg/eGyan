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
                    "name": "avg_course_rating",
                    "columns": ["count", "rating"]
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
        url: data_query_url,
        data: JSON.stringify(fetch_course_query),
        contentType: "application/json"
    }).done(function (data) {
        //console.log(data);
        displayAccordion(data, $('#course_accordion'), "normal");
    }).fail(function (xhr) {
        console.log(xhr);
        displayAccordionError($('#course_accordion'));
    }).always(function () {
        $(".course_loader").hide();
    });
});