$(function () {
  $(".header_slider").slick({
    infinite: true,
    fade: true,
    prevArrow: '<img class="slider-arrows slider-arrows_left" src="images/src/arrow-left.svg" alt="arrow" />',
    nextArrow: '<img class="slider-arrows slider-arrows_right" src="images/src/arrow-right.svg" alt="arrow" />',
    asNavFor: ".slider-dots",
  });

  $(".slider-dots").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: ".header_slider",
  });
});
