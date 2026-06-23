/* ===============================
   FRANCHISE FORM VALIDATION
=============================== */

function cleanIndianMobile(value) {
  let number = String(value || "");

  // Remove all non-digits: +, space, -, brackets, letters
  number = number.replace(/\D/g, "");

  // Remove 0091 prefix
  // 00917300000739 => 7300000739
  if (number.startsWith("0091")) {
    number = number.slice(4);
  }

  // Remove 00 prefix
  // 007300000739 => 7300000739
  if (number.startsWith("00")) {
    number = number.slice(2);
  }

  // Remove 91 country code only when pasted with full number
  // 917300000739 => 7300000739
  if (number.startsWith("91") && number.length > 10) {
    number = number.slice(2);
  }

  // Remove starting zero live
  // 0, 00, 07300000739 => 7300000739
  number = number.replace(/^0+/, "");

  // Keep only first 10 digits in visible field
  if (number.length > 10) {
    number = number.slice(0, 10);
  }

  return number;
}

function isValidIndianMobile(number) {
  return /^[6-9]\d{9}$/.test(number);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function setInvalid(field) {
  if (!field) return;
  field.classList.add("is-invalid");
}

function setValid(field) {
  if (!field) return;
  field.classList.remove("is-invalid");
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".franchise-form");
  if (!form) return;

  const fullName = document.getElementById("fullName");
  const mobileInput = document.getElementById("mobileNumber");
  const mobileError = document.getElementById("mobileError");
  const emailAddress = document.getElementById("emailAddress");
  const cityName = document.getElementById("cityName");
  const stateName = document.getElementById("stateName");
  const investmentRange = document.getElementById("investmentRange");
  const agreeTerms = document.getElementById("agreeTerms");
  const submitBtn = form.querySelector('button[type="submit"]');

  const originalBtnText = submitBtn ? submitBtn.innerHTML : "";

  /* ===============================
     MOBILE NUMBER CLEAN
  =============================== */

  if (mobileInput) {
    mobileInput.addEventListener("input", function () {
      this.value = cleanIndianMobile(this.value);

      setValid(this);

      if (mobileError) {
        mobileError.textContent = "";
      }
    });

    mobileInput.addEventListener("paste", function (e) {
      e.preventDefault();

      const pastedText = (e.clipboardData || window.clipboardData).getData("text");
      this.value = cleanIndianMobile(pastedText);

      setValid(this);

      if (mobileError) {
        mobileError.textContent = "";
      }
    });

    mobileInput.addEventListener("blur", function () {
      const cleanNumber = cleanIndianMobile(this.value);
      this.value = cleanNumber;

      if (!isValidIndianMobile(cleanNumber)) {
        setInvalid(this);

        if (mobileError) {
          mobileError.textContent = "Please enter a valid 10 digit Indian mobile number.";
        }
      } else {
        setValid(this);

        if (mobileError) {
          mobileError.textContent = "";
        }
      }
    });
  }

  /* ===============================
     REMOVE ERROR ON CHANGE
  =============================== */

  form.querySelectorAll(".form-control, .form-select, .form-check-input").forEach(function (field) {
    field.addEventListener("input", function () {
      setValid(this);

      if (field === mobileInput && mobileError) {
        mobileError.textContent = "";
      }
    });

    field.addEventListener("change", function () {
      setValid(this);
    });
  });

  /* ===============================
     FORM SUBMIT
  =============================== */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Full Name
    if (!fullName.value.trim()) {
      setInvalid(fullName);
      isValid = false;
    } else {
      setValid(fullName);
    }

    // Mobile
    const cleanNumber = cleanIndianMobile(mobileInput.value);
    mobileInput.value = cleanNumber;

    if (!isValidIndianMobile(cleanNumber)) {
      setInvalid(mobileInput);
      isValid = false;

      if (mobileError) {
        mobileError.textContent = "Please enter a valid 10 digit Indian mobile number.";
      }
    } else {
      setValid(mobileInput);

      if (mobileError) {
        mobileError.textContent = "";
      }
    }

    // Email
    if (!isValidEmail(emailAddress.value.trim())) {
      setInvalid(emailAddress);
      isValid = false;
    } else {
      setValid(emailAddress);
    }

    // City
    if (!cityName.value.trim()) {
      setInvalid(cityName);
      isValid = false;
    } else {
      setValid(cityName);
    }

    // State
    if (!stateName.value.trim()) {
      setInvalid(stateName);
      isValid = false;
    } else {
      setValid(stateName);
    }

    // Investment Range
    if (!investmentRange.value) {
      setInvalid(investmentRange);
      isValid = false;
    } else {
      setValid(investmentRange);
    }

    // Checkbox
    if (!agreeTerms.checked) {
      setInvalid(agreeTerms);
      isValid = false;
    } else {
      setValid(agreeTerms);
    }

    if (!isValid) {
      const firstInvalid = form.querySelector(".is-invalid");

      if (firstInvalid) {
        firstInvalid.focus();
      }

      return false;
    }

    // Submit button loading
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
        Submitting...
      `;
    }

    const formAction = form.getAttribute("action");

    if (formAction && formAction !== "#") {
      setTimeout(function () {
        form.submit();
      }, 500);
    } else {
      setTimeout(function () {
        if (submitBtn) {
          submitBtn.innerHTML = `<i class="fa-solid fa-check me-2"></i> Submitted Successfully`;
        }

        form.reset();

        setTimeout(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
        }, 1800);
      }, 1200);
    }
  });
});