/* ===============================
   CARD SLIDER
=============================== */

let cardSwiper = null;

function initCardSlider() {
  if (cardSwiper) return;

  const el = document.querySelector(".card-swiper");
  if (!el) return;

  cardSwiper = new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    speed: 700,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    navigation: {
      nextEl: ".slide-next",
      prevEl: ".slide-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 2,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 2,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 2,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 2,
      },
    },

    on: {
      init: function () {
        el.classList.add("swiper-ready");
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", initCardSlider);