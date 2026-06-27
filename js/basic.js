
      document.addEventListener("DOMContentLoaded", function () {
        const year = document.getElementById("currentYear");
        if (year) year.textContent = new Date().getFullYear();

        const backTop = document.getElementById("backToTop");

        if (backTop) {
          window.addEventListener("scroll", function () {
            backTop.classList.toggle("show", window.scrollY > 400);
          });

          backTop.addEventListener("click", function () {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          });
        }

        document.querySelectorAll(".site-navbar .nav-link").forEach(function (link) {
          link.addEventListener("click", function () {
            const nav = document.getElementById("mainNav");

            if (nav && nav.classList.contains("show")) {
              bootstrap.Collapse.getOrCreateInstance(nav).hide();
            }
          });
        });
      });
   