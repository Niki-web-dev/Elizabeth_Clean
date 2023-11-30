document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".nav")
  const bigLogo = document.querySelector(".loop__content")
  const heroImg = document.querySelector(".hero__img")
  //hero img show
  setTimeout(function () {
    if (heroImg) {
      heroImg.classList.add("active")
    }
  }, 200)

  //logo carousel animation
  function toggleActive() {
    if (bigLogo) {
      bigLogo.classList.toggle("active")
      setTimeout(function () {
        bigLogo.classList.toggle("active")
        setTimeout(toggleActive, 2000)
      }, 10000)
    }
  }

  toggleActive()
  //finish logo carousel

  //navbar animation
  const checkPosition = (scrollPosition) => {
    if (scrollPosition >= 50) {
      navbar.classList.add("active")
    } else {
      navbar.classList.remove("active")
    }
  }

  checkPosition(window.scrollY)

  document.addEventListener("scroll", function () {
    checkPosition(window.scrollY)
    //move parsley and mushrooms
    var scrollPosition = window.scrollY
    var parallaxLayers = document.querySelectorAll(".parsley")
    var parallaxLayersSecond = document.querySelectorAll(".mushrooms")

    parallaxLayers.forEach(function (layer, index) {
      const speed = (index + 1) * 0.2
      layer.style.transform = "translateY(" + scrollPosition * speed + "px)"
    })
    parallaxLayersSecond.forEach(function (layer, index) {
      const speed = (index + 1) * 0.1
      layer.style.transform = "translateY(" + scrollPosition * speed + "px)"
    })

    //end move parsley and mushrooms
  })

  //Menu pop up functionality

  const button = document.querySelector(".nav__burger")
  const body = document.querySelector("body")
  const menu = document.querySelector(".nav__links")
  const links = document.querySelectorAll(".nav__link")
  const burgerLine = document.querySelectorAll(".burger__line")

  const openMenu = () => {
    menu.classList.add("is-open")
    body.classList.add("overflow-hidden")
    burgerLine.forEach((line) => {
      line.classList.add("active")
    })
  }
  const hideMenu = () => {
    body.classList.remove("overflow-hidden")
    menu.classList.remove("is-open")
    burgerLine.forEach((line) => {
      line.classList.remove("active")
    })
  }

  button.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      hideMenu()
    } else {
      openMenu()
    }
  })

  links.forEach((link) => {
    link.addEventListener("click", () => {
      hideMenu()
    })
  })

  //end pop up menu functionality

  //recipe margin left functionality
  function updateMarginOnResize() {
    const containerElement = document.querySelector(".recipes .container")
    if (containerElement) {
      const distanceFromLeft = containerElement.offsetLeft

      document.querySelector(".noodles__container").style.marginLeft =
        distanceFromLeft + "px"
    }
  }

  updateMarginOnResize()

  window.addEventListener("resize", updateMarginOnResize)
  //end recipe scroll functionality

  window.addEventListener("load", function () {
    let mapProperty = {
      center: { lat: 25.205, lng: 55.263 },
      zoom: 15,
      styles: [
        {
          featureType: "poi.business",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi.attraction",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi.school",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#c0c0c0" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [{ color: "gray" }],
        },
        {
          featureType: "poi",
          elementType: "hospital",
          stylers: [{ visibility: "off" }],
        },
      ],
    }

    function initMap() {
      if (window.innerWidth <= 479) {
        mapProperty.zoom = 13
      } else {
        mapProperty.zoom = 15
      }

      const map = new google.maps.Map(
        document.getElementById("map"),
        mapProperty
      )

      const image =
        "https://uploads-ssl.webflow.com/65511c0309318e5ad3389991/655a82287dbc4d7805452910_marker.png"

      const points = [
        { lat: 25.195, lng: 55.244 },
        { lat: 25.2059, lng: 55.2621 },
        { lat: 25.2139, lng: 55.2665 },
        { lat: 25.2018, lng: 55.2662 },
      ]

      for (let i = 0; i < points.length; i++) {
        const marker = new google.maps.Marker({
          position: points[i],
          map: map,
          title: "Marker" + (i + 1),
          icon: {
            url: image,
            size: new google.maps.Size(50, 64),
            scaledSize: new google.maps.Size(50, 64),
          },
        })

        const infowindow = new google.maps.InfoWindow({
          content: "Something about a shop " + (i + 1),
        })

        marker.addListener("click", function () {
          infowindow.open(map, marker)
        })
      }
    }

    if (document.getElementById("map")) {
      initMap()
    }
  })

  const noodlesContainer = document.querySelector(".noodles__container")
  const scrollBtn = document.querySelector(".recipes__scroll-btn")

  // scroll noodles__container
  if (noodlesContainer) {
    noodlesContainer.addEventListener("scroll", function () {
      const scrollPosition = noodlesContainer.scrollLeft

      const maxScrollWidth =
        noodlesContainer.scrollWidth - noodlesContainer.clientWidth

      const scrollPercentage = (scrollPosition / maxScrollWidth) * 100

      const limitedScrollPercentage = Math.min(
        Math.max(scrollPercentage, 0),
        300
      )

      scrollBtn.style.marginLeft = `${limitedScrollPercentage}%`
    })
  }

  //map animation
  const preloader = document.querySelector(".map__preloader")

  function isElementInViewport(el) {
    if (el) {
      const rect = el.getBoundingClientRect()
      const persentPreload = 0.9
      return (
        rect.top * persentPreload >= 0 &&
        rect.left * persentPreload >= 0 &&
        rect.bottom * persentPreload <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right * persentPreload <=
          (window.innerWidth || document.documentElement.clientWidth)
      )
    }
  }

  window.addEventListener("scroll", () => {
    if (isElementInViewport(preloader) && preloader.style.display != "none") {
      preloader.style.transform = "scale(5)"
      preloader.style.opacity = "0"

      setTimeout(() => {
        preloader.style.display = "none"
      }, 1000)
    }
  })
})

window.onload = function () {
  $(document).ready(function () {
    const instaSlider = $(".insta__slider")
    const instaScroll = $(".insta__scroll")
    instaSlider.slick({
      infinite: true,
      centerMode: true,
      centerPadding: "500px",
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      arrows: false,
      index: 2,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            centerPadding: "400px",
          },
        },
        {
          breakpoint: 1200,
          settings: {
            centerPadding: "350px",
          },
        },
        {
          breakpoint: 1100,
          settings: {
            centerPadding: "250px",
          },
        },
        {
          breakpoint: 991,
          settings: {
            centerPadding: "15vw",
          },
        },
        {
          breakpoint: 767,
          settings: {
            centerPadding: "70px",
          },
        },
        {
          breakpoint: 690,
          settings: {
            centerPadding: "50px",
          },
        },
        {
          breakpoint: 630,
          settings: {
            centerPadding: "30px",
          },
        },
        {
          breakpoint: 479,
          settings: {
            centerPadding: "4vw",
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    })

    instaSlider.on("afterChange", function (event, slick, currentSlide) {
      shiftInstaScroll(currentSlide)
    })

    const slides = $(".insta__slide:not(.slick-cloned)")

    // Установка ширины и начального положения
    shiftInstaScroll(instaSlider.slick("slickCurrentSlide"))

    function shiftInstaScroll(slideIndex) {
      const scrollLeft = (100 / slides.length) * slideIndex + "%"
      instaScroll.css("left", scrollLeft)
    }
  })
}
