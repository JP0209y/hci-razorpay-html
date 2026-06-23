document.addEventListener("DOMContentLoaded", function () {
  const navbarCollapse = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll("#mainNav .nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 991 && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
});