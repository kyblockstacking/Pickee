$(document).ready(function () {

    $(".nav-restaurants").click(function() {
        $('html,body').animate({
            scrollTop: $(".nav2-restaurants").offset().top},
            'slow');
    });

    $(".nav-concerts").click(function() {
        $('html,body').animate({
            scrollTop: $(".nav2-concerts").offset().top},
            'slow');
    });

    $(".nav-sporting-events").click(function() {
        $('html,body').animate({
            scrollTop: $(".nav2-sporting-events").offset().top},
            'slow');
    });

    $(".data-home-footer").click(function() {
        $('html,body').animate({
            scrollTop: $(".data-home").offset().top},
            'slow');
    });
});
