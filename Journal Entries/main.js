document.addEventListener("DOMContentLoaded", () => {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  const entryTitles = document.querySelectorAll(".entry h2");
  entryTitles.forEach((title) => {
    title.addEventListener("mouseenter", () => {
      title.style.transform = "scale(1.1)";
      title.style.transition = "transform 0.3s ease";
    });
    title.addEventListener("mouseleave", () => {
      title.style.transform = "scale(1)";
    });
  });

  const entries = document.querySelectorAll(".entry");
  const fadeInOnScroll = () => {
    entries.forEach((entry) => {
      const entryPosition = entry.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (entryPosition < windowHeight - 150) {
        entry.classList.add("fade-in");
      }
    });
  };

  window.addEventListener("scroll", fadeInOnScroll);
  fadeInOnScroll();
});
