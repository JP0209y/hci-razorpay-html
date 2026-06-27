/* ===============================
   CARD SLIDER
=============================== */

let cardSwiper = null;

function initCardSlider() {
  const el = document.querySelector(".card-swiper");

  if (!el || typeof Swiper === "undefined") return;
  if (cardSwiper) return;

  const wrapper = el.closest(".slider-wrapper");

  cardSwiper = new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 8,
    loop: true,
    speed: 700,
    watchOverflow: true,
    autoHeight: false,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    navigation: {
      nextEl: wrapper.querySelector(".slide-next"),
      prevEl: wrapper.querySelector(".slide-prev"),
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 12,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 8,
      },
    },

    on: {
      init: function () {
        el.classList.add("swiper-ready");
      },
    },
  });
}

/* ===============================
   INIT ALL SLIDERS
=============================== */

document.addEventListener("DOMContentLoaded", function () {
  initCardSlider();
});