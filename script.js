// --- Only define DOM elements if running in a browser ---
if (typeof document !== 'undefined') {
  // DOM Elements
  const form = document.getElementById('registrationForm');
  const message = document.getElementById('message');
  const passwordToggle = document.getElementById('passwordToggle');
  const passwordField = document.getElementById('password');
  const passwordStrength = document.getElementById('passwordStrength');

  // Event Listeners
  passwordToggle?.addEventListener('click', function () {
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      passwordToggle.textContent = '🙈';
    } else {
      passwordField.type = 'password';
      passwordToggle.textContent = '👁️';
    }
  });

  passwordField?.addEventListener('input', function () {
    updatePasswordStrength(this.value);
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dob = document.getElementById('dob').value;
    const department = document.getElementById('department').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Reset previous errors
    resetErrors();

    // Validate form
    let isValid = true;

    if (!validateName(name)) {
      showError('nameError', 'name');
      isValid = false;
    }

    if (!validateEmail(email)) {
      showError('emailError', 'email');
      isValid = false;
    }

    if (!validatePhone(phone)) {
      showError('phoneError', 'phone');
      isValid = false;
    }

    if (!validateDOB(dob)) {
      showError('dobError', 'dob');
      isValid = false;
    }

    if (!department) {
      showError('departmentError', 'department');
      isValid = false;
    }

    if (!validatePassword(password)) {
      showError('passwordError', 'password');
      isValid = false;
    }

    if (password !== confirmPassword) {
      showError('confirmPasswordError', 'confirmPassword');
      isValid = false;
    }

    if (!terms) {
      showError('termsError');
      isValid = false;
    }

    // Show result
    if (isValid) {
      message.textContent = "Registration successful! Welcome to our institution.";
      message.className = "success";
      form.reset();
      passwordStrength.className = "strength-meter strength-0";
    } else {
      message.textContent = "Please fix the errors above.";
      message.className = "error";
    }
  });

  // Helper functions (DOM only)
  function showError(errorId, inputId = null) {
    document.getElementById(errorId).style.display = 'block';
    if (inputId) {
      document.getElementById(inputId).classList.add('input-error');
    }
  }

  function resetErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
      error.style.display = 'none';
    });

    const errorInputs = document.querySelectorAll('.input-error');
    errorInputs.forEach(input => {
      input.classList.remove('input-error');
    });

    message.style.display = 'none';
  }
}

// --- Validation functions (pure JS, safe for Jest) ---
function validateName(name) {
  const re = /^[A-Za-z\s]{2,50}$/;
  return re.test(name);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^\d{10}$/;
  return re.test(phone.replace(/\D/g, ''));
}

function validateDOB(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 16;
  }
  return age >= 16;
}

function validatePassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
}

function checkPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return strength;
}

function updatePasswordStrength(password) {
  const strength = checkPasswordStrength(password);
  if (typeof document !== 'undefined') {
    const passwordStrength = document.getElementById('passwordStrength');
    if (passwordStrength) passwordStrength.className = `strength-meter strength-${strength}`;
  }
}

// --- Export for testing ---
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateName,
    validateEmail,
    validatePhone,
    validateDOB,
    validatePassword,
    checkPasswordStrength,
  };
}
