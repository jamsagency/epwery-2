document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Intersection Observer for fade-in animations
  const fadeElems = document.querySelectorAll(".fade-in")
  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px",
  }

  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return
      } else {
        entry.target.classList.add("appear")
        appearOnScroll.unobserve(entry.target)
      }
    })
  }, appearOptions)

  fadeElems.forEach((elem) => {
    appearOnScroll.observe(elem)
  })

  // Services accordion (for mobile)
  const accordionItems = document.querySelectorAll(".accordion-item")

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header")
    const content = item.querySelector(".accordion-content")

    header.addEventListener("click", () => {
      const expanded = header.getAttribute("aria-expanded") === "true" || false

      header.setAttribute("aria-expanded", !expanded)
      content.hidden = expanded
    })
  })

  const serviceItems = document.querySelectorAll(".service-item")
  serviceItems.forEach((item) => {
    const title = item.querySelector("h3")
    const content = item.querySelector("p")
    title.addEventListener("click", () => {
      content.classList.toggle("hidden")
    })
  })
})

