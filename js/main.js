document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("primaryNav");
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const tiltNodes = document.querySelectorAll(".tilt-node");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (form && formNote) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formNote.textContent = "Thanks. Our team will reach out within 48 hours.";
      form.reset();
    });
  }

  if (!reduceMotion && tiltNodes.length) {
    tiltNodes.forEach((node) => {
      node.addEventListener("mousemove", (event) => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
      });

      node.addEventListener("mouseleave", () => {
        node.style.transform = "";
      });
    });
  }
});
