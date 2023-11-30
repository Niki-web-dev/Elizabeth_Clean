$(document).ready(function () {
  const slider = $(".compaunds__slider")
  slider.slick({
    autoplay: true,
    autoplaySpeed: 0, // 20 секунд
    dots: false, // Если нужны точки для навигации
    infinite: true,
    speed: 8000,
    variableWidth: true,
    arrows: false,
    pauseOnHover: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
        },
      },
    ],
  })
})
