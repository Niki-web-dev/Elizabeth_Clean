function isElementInViewport(el, percentViewport = 90) {
  if (el) {
    const rect = el.getBoundingClientRect()
    let persentPreload = percentViewport / 100
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

document.addEventListener("DOMContentLoaded", function () {
  const rolton = document.querySelector(".about-descr__rolton")
  const starter = document.getElementById("starter")
  const stepsContent = document.querySelector(".steps__content")
  const pathElemWrapper = document.querySelector(".steps__line")

  //problem section variabless
  const problemWrapper = document.querySelector(
    ".problem .problem__sticky-wrapper"
  )
  const problemTextWrapper = document.querySelector(
    ".problem .problem__overflow"
  )
  const problemTexts = document.querySelectorAll(".problem .problem__text")
  const problemLines = document.querySelectorAll(".problem .vertical__dot")
  const problemTextCounts = problemTextWrapper
    ? problemTextWrapper.childElementCount
    : 1

  //solution section variables
  const solutionWrapper = document.querySelector(
    ".solution .problem__sticky-wrapper"
  )
  const solutionTextWrapper = document.querySelector(
    ".solution .problem__overflow"
  )
  const solutionTexts = document.querySelectorAll(".solution .problem__text")
  const solutionLines = document.querySelectorAll(".solution .vertical__dot")
  const solutionTextCounts = problemTextWrapper
    ? problemTextWrapper.childElementCount
    : 1

  const overlapLine = () => {
    if (isElementInViewport(starter, 100)) {
      starter.parentElement.querySelector("path").style.strokeDashoffset = 0
    }
  }

  const showTextOnScroll = (
    container,
    textWrapper,
    allTexts,
    dots,
    textsCount
  ) => {
    const wrapperContentRect = container
      ? container.getBoundingClientRect()
      : { height: 10, top: 10 }
    if (
      wrapperContentRect.top <= window.innerHeight &&
      wrapperContentRect.bottom >= 0
    ) {
      const scrollPercentage =
        ((window.innerHeight - wrapperContentRect.top * 2) /
          (wrapperContentRect.height + window.innerHeight)) *
        100

      // Ограничиваем значение от 0% до 100%
      const limitedPercentage = Math.min(
        100,
        Math.max(0, scrollPercentage - 12)
      )

      allTexts.forEach((item, i) => {
        const scrollY = container.scrollTop

        // Получаем верхнюю и нижнюю границы блока problemText
        const problemTextTop = allTexts[i].getBoundingClientRect().top
        const problemTextBottom =
          problemTextTop + allTexts[i].getBoundingClientRect().height

        if (
          scrollY + window.innerHeight / 2 >= problemTextTop &&
          scrollY + window.innerHeight / 2 <= problemTextBottom &&
          !dots[i].classList.contains("active")
        ) {
          dots.forEach((problemLine) => {
            problemLine.classList.remove("active")
          })
          dots[i].classList.add("active")
        }
      })

      // Устанавливаем высоту .steps__line в процентах
      textWrapper.style.transform = ` translateY(-${
        limitedPercentage * (textsCount - 1)
      }%) `
    }
  }

  const showLine = () => {
    // Получаем координаты и размеры блока .steps__content
    const stepsContentRect = stepsContent
      ? stepsContent.getBoundingClientRect()
      : { height: 10, top: 10 }

    // Проверяем, виден ли блок .steps__content на экране
    if (
      stepsContentRect.top * 0.9 <= window.innerHeight &&
      stepsContentRect.bottom >= 0
    ) {
      // Вычисляем процент прокрутки внутри блока .steps__content
      const scrollPercentage =
        ((window.innerHeight - stepsContentRect.top) /
          (stepsContentRect.height + window.innerHeight)) *
        100

      // Ограничиваем значение от 0% до 100%
      const limitedPercentage = Math.min(
        100,
        Math.max(0, scrollPercentage - 12)
      )

      // Устанавливаем высоту .steps__line в процентах
      pathElemWrapper.style.height = `${limitedPercentage}%`
    }
  }

  const checkRoltonViewport = () => {
    if (rolton) {
      if (isElementInViewport(rolton, 80)) {
        document.querySelector(".rolton-middle").classList.add("active")
        setTimeout(() => {
          document.querySelector(".rolton-left").classList.add("active")
        }, 200)
        setTimeout(() => {
          document.querySelector(".rolton-right").classList.add("active")
        }, 400)
      }
    }
  }

  checkRoltonViewport()
  overlapLine()
  showLine()
  showTextOnScroll(
    problemWrapper,
    problemTextWrapper,
    problemTexts,
    problemLines,
    problemTextCounts
  )
  showTextOnScroll(
    solutionWrapper,
    solutionTextWrapper,
    solutionTexts,
    solutionLines,
    solutionTextCounts
  )

  window.addEventListener("scroll", () => {
    checkRoltonViewport()
    overlapLine()
    showLine()
    showTextOnScroll(
      problemWrapper,
      problemTextWrapper,
      problemTexts,
      problemLines,
      problemTextCounts
    )
    showTextOnScroll(
      solutionWrapper,
      solutionTextWrapper,
      solutionTexts,
      solutionLines,
      solutionTextCounts
    )
  })
})
