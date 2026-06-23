document.addEventListener("DOMContentLoaded", function () {
  const progressLine = document.querySelector(".top-color-line");

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressLine.style.width = scrollPercent + "%";
  }

  window.addEventListener("scroll", updateScrollProgress);
  window.addEventListener("resize", updateScrollProgress);
  updateScrollProgress();
});