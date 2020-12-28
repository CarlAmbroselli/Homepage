$(document).ready(function() {
    $('.slidewrap').carousel({
        slider: '.slider',
        slide: '.slide',
        slideHed: '.slidehed',
        nextSlide: '.next',
        prevSlide: '.prev',
        addPagination: false,
        addNav: false
    });

    $('.slidewrap').bind('carousel-validate', function(e, data) {
        e.valid = true;
    });
});
