$(function () {
    //help popup
    $('.tooltip_btn').popup({
        popup: $('.help_popup'),
        on: 'click',
    });
    //Accordion
    $("#active_course_accordion").accordion({
        exclusive: false
    });
    $("#completed_course_accordion").accordion();
    $("#available_course_accordion").accordion();
    // Rating
    $('.ui.rating')
        .rating('disable');
});