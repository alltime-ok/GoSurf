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
    responsive: [
      {
        breakpoint: 961,
        settings: "unslick",
      },
    ],
  });

  $(".surf-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<img class="slider-arrows slider-arrows_left" src="images/src/arrow-left.svg" alt="arrow" />',
    nextArrow: '<img class="slider-arrows slider-arrows_right" src="images/src/arrow-right.svg" alt="arrow" />',
    asNavFor: ".slider-map",
    responsive: [
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  $(".slider-map").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: ".surf-slider",
    focusOnSelect: true,
  });

  $(".holder_slider, .shop_slider").slick({
    infinite: true,
    fade: true,
    prevArrow: '<img class="slider-arrows slider-arrows_left" src="images/src/arrow-left.svg" alt="arrow" />',
    nextArrow: '<img class="slider-arrows slider-arrows_right" src="images/src/arrow-right.svg" alt="arrow" />',
  });

  $(
    '<div class="quantity-nav"><div class="quantity-button quantity-up"><img src="images/plus.svg" alt="" /></div><div class="quantity-button quantity-down"><img src="images/minus.svg" alt="" /></div></div>'
  ).insertAfter(".quantity input");
  $(".quantity").each(function () {
    var spinner = jQuery(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find(".quantity-up"),
      btnDown = spinner.find(".quantity-down"),
      min = input.attr("min"),
      max = input.attr("max");

    btnUp.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

    btnDown.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });
  });

  $(".quantity-button").on("click", function () {
    let summ = $(".nights").val() * $(".summ").data("nights") + ($(".guests").val() - 1) * $(".summ").data("guests");
    $(".summ").html(summ);
  });

  let summ = $(".nights").val() * $(".summ").data("nights") + ($(".guests").val() - 1) * $(".summ").data("guests");
  $(".summ").html("$" + summ);

  $(".surfboard-box_circle").on("click", function () {
    $(this).toggleClass("active");
  });
  $(".menu-btn").on("click", function () {
    $(".menu").toggleClass("active");
  });
});
