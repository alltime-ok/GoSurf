$(function () {
  $(".header_slider").slick({
    infinite: true,
    fade: true,
    prevArrow: '<img class="slider-arrows slider-arrows_left" src="images/src/arrow-left.svg" alt="arrow" />',
    nextArrow: '<img class="slider-arrows slider-arrows_right" src="images/src/arrow-right.svg" alt="arrow" />',
    asNavFor: ".slider-dotshead",
  });

  $(".slider-dotshead").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: ".header_slider",
  });

  $(".surf-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<img class="slider-arrows slider-arrows_left" src="images/src/arrow-left.svg" alt="arrow" />',
    nextArrow: '<img class="slider-arrows slider-arrows_right" src="images/src/arrow-right.svg" alt="arrow" />',
    asNavFor: ".slider-map",
  });

  $(".slider-map").slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: ".surf-slider",
    focusOnSelect: true,
  });

  $(".holder_slider").slick({
    infinite: true,
    fade: true,
    prevArrow: '<img class="slider-arrows slider-arrows_left" src="images/src/arrow-left.svg" alt="arrow" />',
    nextArrow: '<img class="slider-arrows slider-arrows_right" src="images/src/arrow-right.svg" alt="arrow" />',
  });
});
