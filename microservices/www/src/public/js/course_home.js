$(function () {
    //For closing messages
    $(".message .close").on('click', function () {
        $(this).closest('.message').transition('fade');
    });
    //Sidebar for Handheld Devices
    $("#module_sidebar").sidebar({
        context: $('#course_content_segment')
    }).sidebar('attach events', '#course_module .item');
});