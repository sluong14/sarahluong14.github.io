document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

// contact validation
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("form-status");

    if (!email || !message) {
      status.textContent = "Please fill out both fields.";
      return;
    }

    status.textContent = "Thanks for reaching out!";
    form.reset();
  });
});
