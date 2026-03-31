document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("primaryNav");
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

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
});
