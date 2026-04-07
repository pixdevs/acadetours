document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = document.querySelectorAll(".reveal");
  const timelineSteps = document.querySelectorAll(".timeline-step");

  revealElements.forEach((element, index) => {
    element.style.setProperty("--delay", `${Math.min(index * 45, 260)}ms`);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("in"));
    timelineSteps.forEach((step) => step.classList.add("is-active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  timelineSteps.forEach((step) => timelineObserver.observe(step));
});
