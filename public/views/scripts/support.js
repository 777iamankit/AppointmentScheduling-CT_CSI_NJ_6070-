

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("supportForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("supportEmail").value;
      const message = document.getElementById("supportMessage").value;
      const responseEl = document.getElementById("supportResponse");

      // ✅ Show alert once message is submitted
      alert("Information sent successfully. Wait for the response!");

      // 🚀 OPTIONAL: simulate sending to backend
      responseEl.innerText = `Thanks, ${email}! We'll respond soon.`;
      form.reset();
    });
  }
});
