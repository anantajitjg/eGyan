// Trigger Login/Sign Up Modal
function triggerModal(selector) {
    $(selector).modal({
        onHidden: function () {
            $('form').form('clear');
            $('form .message').html("");
            $(".main_loader").css("display", "none");
            $("form .button").removeClass("disabled");
            $('.user_error').css("display","none");
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
    // Accordion
    $('.ui.accordion')
        .accordion();
    // Rating
    $('.ui.rating')
        .rating('disable');
    //Login/Sign Up Modal
    $('.signup_trigger').click(function () {
        triggerModal(".signup_modal");
    });
    $('.login_trigger').click(function () {
        triggerModal(".login_modal");
    });
});