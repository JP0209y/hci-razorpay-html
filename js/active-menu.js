document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".site-navbar .nav-link");

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.closest(".nav-item").classList.add("active-page");
    }
  });
});