function cleanIndianMobile(value) {
  let number = String(value || "");

  // +, space, dash, brackets, letters sab remove
  number = number.replace(/\D/g, "");

  // 0091 / 091 / 91 country code remove
  if (number.startsWith("0091")) {
    number = number.slice(4);
  }

  if (number.startsWith("091")) {
    number = number.slice(3);
  }

  if (number.startsWith("91") && number.length > 10) {
    number = number.slice(2);
  }

  // Starting 0 / 00 remove
  number = number.replace(/^0+/, "");

  // Agar ab bhi 10 digit se zyada hai to last 10 digit rakho
  if (number.length > 10) {
    number = number.slice(-10);
  }

  return number;
}

document.addEventListener("DOMContentLoaded", function () {
  const supportForm = document.querySelector(".support-form");
  const phoneInput = document.getElementById("phone");

  if (!supportForm || !phoneInput) return;

  const submitBtn = supportForm.querySelector(".submit-btn");
  const btnText = supportForm.querySelector(".btn-text");
  const btnLoading = supportForm.querySelector(".btn-loading");
  const btnIcon = supportForm.querySelector(".btn-icon");

  function showError(input) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }

  function showSuccess(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }

  function validateField(input) {
    const value = input.value.trim();

    if (!value) {
      showError(input);
      return false;
    }

    if (input.id === "phone") {
      input.value = cleanIndianMobile(input.value);

      if (!/^[6-9][0-9]{9}$/.test(input.value)) {
        showError(input);
        return false;
      }
    }

    showSuccess(input);
    return true;
  }

  phoneInput.addEventListener("input", function () {
    phoneInput.value = cleanIndianMobile(phoneInput.value);
  });

  phoneInput.addEventListener("paste", function () {
    setTimeout(function () {
      phoneInput.value = cleanIndianMobile(phoneInput.value);
    }, 0);
  });

  phoneInput.addEventListener("blur", function () {
    phoneInput.value = cleanIndianMobile(phoneInput.value);
    validateField(phoneInput);
  });

  supportForm.querySelectorAll("input, textarea").forEach(function (input) {
    input.addEventListener("blur", function () {
      validateField(input);
    });

    input.addEventListener("input", function () {
      if (input.classList.contains("is-invalid")) {
        validateField(input);
      }
    });
  });

  supportForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fields = supportForm.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    fields.forEach(function (field) {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      const firstInvalid = supportForm.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("disabled");
    }

    if (btnText) btnText.classList.add("d-none");
    if (btnLoading) btnLoading.classList.remove("d-none");
    if (btnIcon) btnIcon.classList.add("d-none");

    // Form submit karna ho to ye line use karo
    supportForm.submit();
  });
});