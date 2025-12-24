// stats-counter.js

document.addEventListener("DOMContentLoaded", function () {
  const numbers = Array.from(document.querySelectorAll(".stat-number"));
  if (!numbers.length) return;

  let hasRun = false;

  function animateNumbers() {
    if (hasRun) return;
    hasRun = true;

    numbers.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"), 10) || 0;
      const duration = 1200; // ms
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value + "%";

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + "%"; // ensure exact
        }
      }

      requestAnimationFrame(update);
    });
  }

  const statsSection = document.querySelector(".collection-stats");
  if (!statsSection) return;

  // trigger when stats section enters viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  observer.observe(statsSection);
});
