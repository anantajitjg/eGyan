$(function () {
    //For closing messages
    $(".message .close").on('click', function () {
        $(this).closest('.message').transition('fade');
    });
});