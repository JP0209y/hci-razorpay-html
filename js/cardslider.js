/* ===============================
   CARD SLIDER
=============================== */

let cardSwiper = null;

function initCardSlider() {
  if (cardSwiper) return;

  const el = document.querySelector(".card-swiper");
  if (!el || typeof Swiper === "undefined") return;

  const wrapper = el.closest(".slider-wrapper") || document;

  cardSwiper = new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 16,
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



/* ===============================
   PRODUCT CARD SLIDERS
   Same Slide View For All Tabs
=============================== */

let productCardSwipers = [];

function initProductCardSliders() {
  const sliders = document.querySelectorAll(".product-card-swiper");

  if (!sliders.length || typeof Swiper === "undefined") return;

  sliders.forEach(function (sliderEl) {
    if (sliderEl.swiper) return;

    const sliderWrapper = sliderEl.closest(".slider-wrapper");
    const slideCount = sliderEl.querySelectorAll(".swiper-slide").length;

    const nextBtn = sliderWrapper
      ? sliderWrapper.querySelector(".product-slide-next")
      : null;

    const prevBtn = sliderWrapper
      ? sliderWrapper.querySelector(".product-slide-prev")
      : null;

    /*
      Loop false rakha hai, kyunki Fujiiryoki me 2 slides hain.
      Loop true karne ke liye har tab me enough slides hone chahiye.
    */
    const enableLoop = slideCount >= 5;

    const swiper = new Swiper(sliderEl, {
      slidesPerView: 1,
      spaceBetween: 2,
      loop: enableLoop,
      speed: 700,
      autoHeight: false,
      watchOverflow: false,
      observer: true,
      observeParents: true,

      autoplay: slideCount > 1
        ? {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,

      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
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
          slidesPerView: 3.5,
          spaceBetween: 2,
        },
      },

      on: {
        init: function () {
          sliderEl.classList.add("swiper-ready");

          if (slideCount <= 1 && sliderWrapper) {
            sliderWrapper.classList.add("single-product-slider");
          }
        },
      },
    });

    productCardSwipers.push(swiper);
  });
}



/* ===============================
   UPDATE PRODUCT SLIDER ON TAB CHANGE
=============================== */

function updateProductSlidersOnTabChange() {
  const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');

  tabButtons.forEach(function (tabBtn) {
    tabBtn.addEventListener("shown.bs.tab", function () {
      setTimeout(function () {
        productCardSwipers.forEach(function (swiper) {
          if (!swiper || swiper.destroyed) return;

          swiper.update();

          if (swiper.params.loop && swiper.slideToLoop) {
            swiper.slideToLoop(0, 0);
          } else {
            swiper.slideTo(0, 0);
          }

          if (swiper.autoplay && swiper.params.autoplay) {
            swiper.autoplay.start();
          }
        });
      }, 150);
    });
  });
}



/* ===============================
   UPDATE ON WINDOW RESIZE
=============================== */

window.addEventListener("resize", function () {
  productCardSwipers.forEach(function (swiper) {
    if (!swiper || swiper.destroyed) return;
    swiper.update();
  });
});



/* ===============================
   INIT ALL SLIDERS
=============================== */

document.addEventListener("DOMContentLoaded", function () {
  initCardSlider();
  initProductCardSliders();
  updateProductSlidersOnTabChange();
});